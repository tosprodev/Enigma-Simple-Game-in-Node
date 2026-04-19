🕵️‍♂️ Enigma: Tactical Breach Platform

Enigma is a high-fidelity, cinematic puzzle ecosystem designed for creators and "operatives." Built with a sophisticated hacker aesthetic, it transforms traditional puzzles into time-sensitive tactical missions. Whether reconstructing encrypted intel via visual tiles or unscrambling high-level ciphers, every move is logged, analyzed, and tracked in a centralized Command Center.

📑 Table of Contents

Core Gameplay Mechanics

System Architecture

Administrative Control

User Experience & UI

API Reference

Installation & Setup

Security Protocols

🎮 Core Gameplay Mechanics

1. Visual Swap (Image-Based Intel)

The standard protocol for visual reconstruction.

Dynamic Grids: Creators can deploy missions ranging from 3x3 (Easy) for quick breaches to 10x10 (Impossible) for master-level operatives.

Rotation Encryption: For added difficulty, tiles are randomly rotated in 90-degree increments. Operatives must double-tap (mobile) or right-click (desktop) to correct orientation while positioning.

Intel Hints: Operatives have a limited "Memory Buffer" (5 hints) to view a blurred version of the target image.

2. Cipher Breach (Text-Based Decryption)

A new monospaced decryption challenge.

Positional Feedback: As characters are moved, the system provides real-time tactical feedback. Correctly placed letters trigger a Tactical Green Glow and a pulse effect, indicating that part of the "Secret Key" is breached.

Grid Padding: The engine automatically calculates the square root of the string length and pads the grid with blank "space" blocks, requiring operatives to manage spacing as part of the puzzle.

⚙️ System Architecture

Hybrid Input Engine

The play.html engine features a custom-built pointer event listener that manages a unified input stream:

Tap/Select: Classic two-click swap logic.

Drag & Drop: Press and hold to detach a card from the grid. Moving it over another piece and releasing triggers a coordinate-based swap.

Collision Detection: Uses elementFromPoint to determine the swap target during high-speed dragging operations.

Data Ecosystem

Persistence: SQLite3 manages users, mission metadata, and play logs.

Cascade Purging: Deleting a mission automatically purges all associated analytics logs to ensure system hygiene.

Pagination: The "Mission Archives" uses client-side pagination (10 items per page) to ensure the UI remains performant even with hundreds of deployed missions.

🛡️ Administrative Control

The platform includes a hidden System Override (Admin) portal for global oversight:

Global Purge: Admins can delete any mission across the entire ecosystem.

Operative Management: Monitor all registered users and their join dates.

System Integrity: Admins can update their own root credentials and profile data via a secure authorization check requiring the current master passkey.

Ecosystem Analytics: A dedicated "Master Control" dashboard showing total users, global mission counts, and every breach attempt made site-wide.

🎨 User Experience & UI

Glassmorphism: Layers of translucent panels with backdrop-filter: blur(16px) provide visual depth.

Sticky Architecture: Custom CSS ensures the footer remains anchored to the bottom of the viewport on short pages but flows naturally on long, paginated lists.

Cinematic Feedback: Uses "Toast" notifications for system feedback (e.g., "Mission Purged," "Key Sent") instead of standard browser alerts to maintain immersion.

Mobile-First: Fully responsive sidebars that slide out of view and touch-optimized hit areas for grid pieces.

🔌 API Reference

Auth

POST /api/request-otp - Transmits a 6-digit code via cinematic email.

POST /api/verify-otp - Authorizes the session and grants access to the Command Center.

Missions

POST /api/puzzles - Deploys a new mission (Handles Multipart Image uploads + JSON data).

GET /api/dashboard/:email - Fetches all missions and logs for a specific creator.

DELETE /api/puzzle/:id - Permanently erases mission data and logs.

Admin

POST /api/admin/login - Validates Root credentials.

PUT /api/admin/profile - Updates Master Admin identity (Requires password verification).

GET /api/admin/stats - Compiles global ecosystem metrics.

🚀 Installation & Setup

Dependencies: Ensure you have Node.js and NPM installed.

Environment: Create a .env file in the root directory.

PORT=3000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
BASE_URL=http://localhost:3000


Boot: Run npm install followed by node server.js.

First Access: Login with the default master email kaif.mth@gmail.com to trigger the seed admin account.

📜 License & Credits

Enigma Tactical Challenge is developed and maintained by Md Kaif.
Designed for high-performance tactical engagement and mental training.

© 2026 Enigma Platform. Root Access Only.