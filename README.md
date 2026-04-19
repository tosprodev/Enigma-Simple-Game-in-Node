````markdown
# 🕵️‍♂️ Enigma: Tactical Breach Platform

**Enigma** is a high-fidelity, cinematic puzzle ecosystem designed for creators and operatives. Built with a sophisticated hacker aesthetic, it transforms traditional puzzles into **time-sensitive tactical missions**.  

🌐 **Live Deployment:**  
👉 https://slateblue-mole-540402.hostingersite.com  

Every action is **tracked, logged, and analyzed** through a centralized **Command Center**, delivering a true cyber-operations experience.

---

## 📑 Table of Contents
- 🎮 Core Gameplay Mechanics  
- ⚙️ System Architecture  
- 🛡️ Administrative Control  
- 🧠 Master Dashboard (Extended)  
- 🎨 User Experience & UI  
- 🔌 API Reference  
- 🚀 Installation & Setup  
- 🔐 Gmail App Password Setup  
- 📜 License & Credits  

---

## 🎮 Core Gameplay Mechanics

### 1. 🧩 Visual Swap (Image-Based Intel)

- **Dynamic Grid Scaling**  
  From **3×3 (Recruit)** → **10×10 (Black Ops Level)**  

- **Rotation Encryption Layer**  
  Tiles rotate randomly → must be corrected during placement  

- **Memory Buffer (Hint System)**  
  - Max 5 tactical hints  
  - Blurred preview system  
  - Limited resource → strategic usage required  

---

### 2. 🔐 Cipher Breach (Text-Based Decryption)

- **Live Tactical Feedback Engine**
  - ✅ Green = Correct placement  
  - ⚡ Pulse Animation = Confirmed breach  

- **Auto Grid Computation**
  - Square root logic builds grid  
  - Empty slots become **decoy space nodes**  

---

## ⚙️ System Architecture

### 🧠 Hybrid Input Engine

Supports multi-mode interaction:

- Click-to-swap  
- Drag & drop with coordinate tracking  
- Real-time collision detection using `elementFromPoint()`  

---

### 🗄️ Data Ecosystem

- **SQLite3 Database**
  - Users  
  - Missions  
  - Attempt Logs  

- **Cascade Deletion Engine**
  - Removing a mission wipes all analytics  

- **Pagination Engine**
  - Optimized rendering (10 missions per page)  

---

## 🛡️ Administrative Control

### 🔐 Admin Access Portal

👉 `/admin-login.html`

This hidden route unlocks **System Override Mode**

---

### 🔑 Default Admin Credentials

```txt
Email:    kaif.mth@gmail.com
Password: 12345678
````

> ⚠️ Immediately update credentials after first login.

---

### 🧰 Admin Capabilities

* 🔥 Global Mission Deletion
* 👤 User Monitoring System
* 🔐 Secure Credential Update
* 📊 Full Ecosystem Visibility

---

## 🧠 Master Dashboard (Extended Intelligence System)

The **Admin Dashboard** acts as a real-time tactical intelligence hub.

### 📊 Core Metrics

* 👥 Total Registered Operatives
* 🧩 Total Missions Deployed
* ⚡ Total Breach Attempts
* 📈 Success vs Failure Ratio

---

### 🧾 Mission Intelligence Panel

* Mission Name & Difficulty
* Creator Identity
* Total Attempts per Mission
* Completion Rate (%)
* Time-to-Solve Analytics

---

### 👁️ Operative Surveillance

* User Email Tracking
* Join Timestamp
* Activity Frequency
* Last Active Status

---

### 🔍 Breach Logs (Deep Tracking)

Each attempt records:

* Timestamp
* Puzzle Type
* Moves Taken
* Completion Status
* Time Duration

---

### 🧹 System Hygiene Tools

* Bulk Mission Purge
* Selective Data Cleanup
* Log Reset Engine

---

### 🔐 Security Layer

* Password verification before admin updates
* Session-based authorization
* Protected API routes

---

## 🎨 User Experience & UI

* 🧊 **Glassmorphism Design System**

  * Blur overlays
  * Neon accent highlights

* 📌 **Sticky Layout Engine**

  * Footer adapts dynamically

* 🔔 **Toast Notification System**

  * No default alerts
  * Immersive system messages

* 📱 **Mobile-Optimized Interface**

  * Slide-out panels
  * Gesture-friendly grids

---

## 🔌 API Reference

### 🔐 Auth

```http
POST /api/request-otp
POST /api/verify-otp
```

### 🎯 Missions

```http
POST   /api/puzzles
GET    /api/dashboard/:email
DELETE /api/puzzle/:id
```

### 🛡️ Admin

```http
POST /api/admin/login
PUT  /api/admin/profile
GET  /api/admin/stats
```

---

## 🚀 Installation & Setup

### 📦 Requirements

* Node.js
* NPM

---

### ⚙️ Environment Configuration

```env
PORT=3000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
BASE_URL=http://localhost:3000
```

---

### ▶️ Run Locally

```bash
npm install
node server.js
```

---

### 🌐 Access Points

* User Interface → `/index.html`
* Admin Panel → `/admin-login.html`
* Dashboard → `/dashboard.html`

---

## 🔐 Gmail App Password Setup

### ⚠️ Required for OTP System

---

### Steps

1. Visit: [https://myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Open **App Passwords**
4. Select:

   * App → Mail
   * Device → Custom (`Enigma Platform`)
5. Click **Generate**

---

### Example

```txt
abcd efgh ijkl mnop
```

---

### Add to `.env`

```env
EMAIL_PASS=abcdefghijklmnop
```

> ❗ Never use your real Gmail password.

---

## 📜 License & Credits

**Enigma Tactical Challenge**
Developed by **Md Kaif**

---

### 🧠 Vision

* Tactical Thinking
* Cyber Intelligence Simulation
* Gamified Decryption Systems

---

© 2026 Enigma Platform
**Root Access Only | Authorized Operatives Only**

```
```
