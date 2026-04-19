````markdown
# 🕵️‍♂️ Enigma: Tactical Breach Platform

**Enigma** is a high-fidelity, cinematic puzzle ecosystem designed for creators and operatives. Built with a sophisticated hacker aesthetic, it transforms traditional puzzles into **time-sensitive tactical missions**.  

Whether reconstructing encrypted intel via visual tiles or decrypting high-level ciphers, every move is **logged, analyzed, and tracked** in a centralized **Command Center**.

---

## 📑 Table of Contents
- 🎮 Core Gameplay Mechanics  
- ⚙️ System Architecture  
- 🛡️ Administrative Control  
- 🎨 User Experience & UI  
- 🔌 API Reference  
- 🚀 Installation & Setup  
- 🔐 Gmail App Password Setup  
- 📜 License & Credits  

---

## 🎮 Core Gameplay Mechanics

### 1. 🧩 Visual Swap (Image-Based Intel)
The standard protocol for visual reconstruction.

- **Dynamic Grids**  
  Deploy missions from **3×3 (Easy)** to **10×10 (Impossible)**.

- **Rotation Encryption**  
  Tiles rotate in 90° increments.  
  - 📱 Mobile: Double-tap  
  - 🖥️ Desktop: Right-click  

- **Intel Hints**  
  Operatives have a limited **Memory Buffer (5 hints)** to preview a blurred target image.

---

### 2. 🔐 Cipher Breach (Text-Based Decryption)
A monospaced decryption challenge.

- **Positional Feedback**  
  Correct placements trigger:  
  - ✅ Tactical Green Glow  
  - ⚡ Pulse Effect  

- **Grid Padding**  
  Automatically computes square root of string length and fills empty blocks — spacing becomes part of the puzzle.

---

## ⚙️ System Architecture

### 🧠 Hybrid Input Engine
The `play.html` engine handles unified interaction:

- **Tap / Select** → Two-click swap logic  
- **Drag & Drop** → Smooth tile repositioning  
- **Collision Detection** → Uses `elementFromPoint` for precision targeting  

---

### 🗄️ Data Ecosystem

- **Persistence** → SQLite3 (users, missions, logs)  
- **Cascade Purging** → Deleting missions removes all related logs  
- **Pagination** → 10 items per page for performance optimization  

---

## 🛡️ Administrative Control

A hidden **System Override (Admin Portal)** provides:

- 🔥 **Global Purge** → Delete any mission  
- 👤 **Operative Management** → Monitor users & join dates  
- 🔑 **Credential Control** → Update root credentials securely  
- 📊 **Ecosystem Analytics Dashboard**:
  - Total users  
  - Mission counts  
  - Global breach attempts  

---

## 🎨 User Experience & UI

- **Glassmorphism UI**  
  Translucent panels with `backdrop-filter: blur(16px)`

- **Sticky Layout System**  
  Footer remains adaptive across all page lengths  

- **Cinematic Feedback**  
  Toast notifications instead of browser alerts  

- **Mobile-First Design**  
  - Responsive sidebars  
  - Touch-optimized interactions  

---

## 🔌 API Reference

### 🔐 Auth
```http
POST /api/request-otp
POST /api/verify-otp
````

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

### 📦 Prerequisites

* Node.js
* NPM

---

### ⚙️ Environment Setup

Create a `.env` file in the root directory:

```env
PORT=3000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
BASE_URL=http://localhost:3000
```

---

### ▶️ Run the Application

```bash
npm install
node server.js
```

---

### 🔑 First Access

Login using:

```
Email: kaif.mth@gmail.com
```

This initializes the **default admin account**.

---

## 🔐 Gmail App Password Setup (IMPORTANT)

To enable email services (OTP system), you must generate a **Gmail App Password**.

### ⚠️ Requirements

* 2-Step Verification must be enabled on your Google account

---

### 🪜 Steps to Generate App Password

1. Go to: [https://myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (if not already enabled)
3. Navigate to **App Passwords**
4. Select:

   * App: **Mail**
   * Device: **Other (Custom Name)** → Enter: `Enigma Platform`
5. Click **Generate**

---

### 🔑 Output Example

You will receive a 16-character password like:

```
abcd efgh ijkl mnop
```

---

### 📌 Usage

Add it to your `.env` file:

```env
EMAIL_PASS=abcdefghijklmnop
```

> ⚠️ Do NOT use your actual Gmail password. Always use the App Password.

---

## 📜 License & Credits

**Enigma Tactical Challenge**
Developed and maintained by **Md Kaif**

Designed for:

* Tactical engagement
* Cognitive enhancement
* Secure puzzle ecosystems

---

© 2026 Enigma Platform
**Root Access Only**

```
```
