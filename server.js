// server.js
require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const getEmailTemplate = require('./emailTemplate');

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

if (!fs.existsSync('./uploads')){ fs.mkdirSync('./uploads'); }

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => { cb(null, uuidv4() + path.extname(file.originalname)); }
});
const upload = multer({ storage });
app.use('/uploads', express.static('uploads')); 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) console.error('DB Error: ', err);
});

// --- DATABASE INITIALIZATION ---
db.serialize(() => {
    // Added 'password' and 'role' columns
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT NOT NULL, 
        email TEXT UNIQUE NOT NULL, 
        password TEXT,
        role TEXT DEFAULT 'user',
        otp TEXT, 
        otp_expiry INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS puzzles (
        id TEXT PRIMARY KEY, creator_email TEXT, title TEXT, type TEXT DEFAULT 'image', 
        content TEXT, image_url TEXT, grid_size INTEGER, time_limit INTEGER DEFAULT 300, 
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS plays (
        id INTEGER PRIMARY KEY AUTOINCREMENT, puzzle_id TEXT, player_name TEXT, 
        moves INTEGER, time_seconds INTEGER, played_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // --- SEED ADMIN ACCOUNT ---
    db.get("SELECT * FROM users WHERE email = 'kaif.mth@gmail.com'", (err, row) => {
        if (!row) {
            db.run("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", 
            ['Master Admin', 'kaif.mth@gmail.com', '12345678', 'admin']);
            console.log("System: Admin account seeded successfully.");
        }
    });
});

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// --- STANDARD AUTH & GAME ROUTES ---
app.post('/api/request-otp', (req, res) => {
    const { name, email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    const otp = generateOTP();
    const expiry = Date.now() + 10 * 60 * 1000;

    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        const finalName = row ? row.name : (name || 'Operative');
        const saveOtpAndSendEmail = (dbError) => {
            if (dbError) return res.status(500).json({ error: 'Failed to save OTP' });
            transporter.sendMail({
                from: `"Enigma Platform" <${process.env.EMAIL_USER}>`,
                to: email, subject: `${otp} is your Enigma Access Code`,
                html: getEmailTemplate(finalName, otp)
            }, (mailErr) => {
                if (mailErr) return res.status(500).json({ error: 'Failed to send email' });
                res.json({ success: true, message: 'OTP sent!' });
            });
        };
        if (!row) db.run('INSERT INTO users (name, email, otp, otp_expiry) VALUES (?, ?, ?, ?)', [finalName, email, otp, expiry], saveOtpAndSendEmail);
        else db.run('UPDATE users SET otp = ?, otp_expiry = ? WHERE email = ?', [otp, expiry, email], saveOtpAndSendEmail);
    });
});

app.post('/api/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (!row || String(row.otp).trim() !== String(otp).trim() || Date.now() > row.otp_expiry) return res.status(400).json({ error: 'Invalid or expired OTP' });
        db.run('UPDATE users SET otp = NULL, otp_expiry = NULL WHERE email = ?', [email]);
        res.json({ success: true, message: 'Access Granted!', name: row.name });
    });
});

app.post('/api/puzzles', upload.single('image'), (req, res) => {
    const { creator_email, title, type, content, grid_size, time_limit } = req.body;
    const puzzleId = uuidv4();
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    db.run(`INSERT INTO puzzles (id, creator_email, title, type, content, image_url, grid_size, time_limit) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
        [puzzleId, creator_email, title, type || 'image', content || null, imageUrl, grid_size, time_limit], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to create mission' });
        res.json({ success: true, link: `${BASE_URL}/play.html?id=${puzzleId}` });
    });
});

app.get('/api/dashboard/:email', (req, res) => {
    db.all('SELECT * FROM puzzles WHERE creator_email = ? ORDER BY created_at DESC', [req.params.email], (err, puzzles) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if(!puzzles || puzzles.length === 0) return res.json({ puzzles: [] });
        const puzzleIds = puzzles.map(p => `'${p.id}'`).join(',');
        db.all(`SELECT * FROM plays WHERE puzzle_id IN (${puzzleIds}) ORDER BY played_at DESC`, [], (err, plays) => {
            res.json({ puzzles: puzzles.map(p => { p.plays = plays ? plays.filter(play => play.puzzle_id === p.id) : []; return p; }) });
        });
    });
});

app.get('/api/puzzle/:id', (req, res) => {
    db.get(`SELECT p.*, u.name as creator_name FROM puzzles p JOIN users u ON p.creator_email = u.email WHERE p.id = ?`, 
    [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (!row) return res.status(404).json({ error: 'Mission not found' });
        res.json(row);
    });
});

app.post('/api/record-play', (req, res) => {
    const { puzzle_id, player_name, moves, time_seconds } = req.body;
    db.run('INSERT INTO plays (puzzle_id, player_name, moves, time_seconds) VALUES (?, ?, ?, ?)', [puzzle_id, player_name, moves, time_seconds], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to log mission success' });
        res.json({ success: true });
    });
});

app.delete('/api/puzzle/:id', (req, res) => {
    const puzzleId = req.params.id;
    db.run('DELETE FROM plays WHERE puzzle_id = ?', [puzzleId], () => {
        db.run('DELETE FROM puzzles WHERE id = ?', [puzzleId], (err2) => {
            if (err2) return res.status(500).json({ error: 'Failed to purge mission' });
            res.json({ success: true });
        });
    });
});

// ==========================================
// --- NEW: SYSTEM ADMIN ENDPOINTS ---
// ==========================================

// Admin Login
app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;
    db.get("SELECT * FROM users WHERE email = ? AND password = ? AND role = 'admin'", [email, password], (err, row) => {
        if (row) res.json({ success: true, user: { name: row.name, email: row.email, role: 'admin' } });
        else res.status(401).json({ error: 'System Access Denied. Invalid Credentials.' });
    });
});

// Admin System Stats
app.get('/api/admin/stats', (req, res) => {
    db.get("SELECT COUNT(*) as totalUsers FROM users", (err, users) => {
        db.get("SELECT COUNT(*) as totalPuzzles FROM puzzles", (err, puzzles) => {
            db.get("SELECT COUNT(*) as totalPlays FROM plays", (err, plays) => {
                res.json({ users: users.totalUsers, puzzles: puzzles.totalPuzzles, plays: plays.totalPlays });
            });
        });
    });
});

// Admin Get All Users
app.get('/api/admin/users', (req, res) => {
    db.all("SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC", (err, rows) => {
        res.json(rows);
    });
});

// Admin Delete User (Cascade purges their puzzles and analytics)
app.delete('/api/admin/user/:email', (req, res) => {
    const targetEmail = req.params.email;
    if(targetEmail === 'kaif.mth@gmail.com') return res.status(400).json({error: "Cannot delete Master Admin"});
    
    db.run("DELETE FROM users WHERE email = ?", [targetEmail], (err) => {
        if(err) return res.status(500).json({error: "Failed to delete user"});
        
        db.all("SELECT id FROM puzzles WHERE creator_email = ?", [targetEmail], (err, puzzles) => {
            if(puzzles && puzzles.length > 0) {
                const puzzleIds = puzzles.map(p => `'${p.id}'`).join(',');
                db.run(`DELETE FROM plays WHERE puzzle_id IN (${puzzleIds})`);
                db.run("DELETE FROM puzzles WHERE creator_email = ?", [targetEmail]);
            }
            res.json({ success: true });
        });
    });
});

// Admin Get All Puzzles Globally
app.get('/api/admin/puzzles', (req, res) => {
    db.all(`
        SELECT p.id, p.title, p.type, p.grid_size, p.created_at, u.name as creator_name, u.email as creator_email,
        (SELECT COUNT(*) FROM plays WHERE puzzle_id = p.id) as play_count
        FROM puzzles p 
        LEFT JOIN users u ON p.creator_email = u.email 
        ORDER BY p.created_at DESC
    `, (err, rows) => {
        res.json(rows);
    });
});

// Admin Update Profile & Password
app.put('/api/admin/profile', (req, res) => {
    const { currentEmail, currentPassword, newName, newEmail, newPassword } = req.body;

    // 1. Verify the current password first
    db.get("SELECT * FROM users WHERE email = ? AND password = ? AND role = 'admin'", [currentEmail, currentPassword], (err, row) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (!row) return res.status(401).json({ error: 'System Access Denied. Invalid current password.' });

        const finalName = newName || row.name;
        const finalEmail = newEmail || row.email;
        const finalPassword = newPassword || row.password;

        // 2. Check if the admin is changing their email to one that already exists
        if (finalEmail !== currentEmail) {
            db.get("SELECT id FROM users WHERE email = ?", [finalEmail], (err, existing) => {
                if (existing) return res.status(400).json({ error: 'That email is already assigned to another operative.' });
                executeProfileUpdate(finalName, finalEmail, finalPassword, currentEmail);
            });
        } else {
            executeProfileUpdate(finalName, finalEmail, finalPassword, currentEmail);
        }
    });

    // 3. Execute the update
    function executeProfileUpdate(name, email, password, oldEmail) {
        db.run("UPDATE users SET name = ?, email = ?, password = ? WHERE email = ?", [name, email, password, oldEmail], (err) => {
            if (err) return res.status(500).json({ error: 'Failed to update system profile.' });
            res.json({ success: true, user: { name, email, role: 'admin' } });
        });
    }
});

app.listen(PORT, () => console.log(`Server active on ${BASE_URL}`));