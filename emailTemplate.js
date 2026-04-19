// emailTemplate.js
module.exports = (name, otp) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
            body { margin: 0; padding: 0; font-family: 'Montserrat', Helvetica, Arial, sans-serif; background-color: #0a0b10; color: #ffffff; }
            .wrapper { width: 100%; table-layout: fixed; background-color: #0a0b10; padding-bottom: 40px; }
            .main { background-color: #161b22; margin: 0 auto; width: 100%; max-width: 600px; border-spacing: 0; color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #30363d; }
            .header { background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%); padding: 30px; text-align: center; }
            .content { padding: 40px 30px; text-align: center; }
            .otp-container { background-color: #0d1117; border: 2px dashed #3b82f6; border-radius: 12px; padding: 20px; margin: 25px 0; display: inline-block; width: 80%; }
            .otp-code { font-size: 42px; font-weight: 800; letter-spacing: 10px; color: #3b82f6; margin: 0; }
            .footer { padding: 20px; text-align: center; font-size: 11px; color: #8b949e; background-color: #0d1117; }
            .btn { text-decoration: none; color: #3b82f6; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <table class="main">
                <tr>
                    <td class="header">
                        <h1 style="margin:0; font-size: 24px; letter-spacing: 4px; text-transform: uppercase;">Enigma Platform</h1>
                    </td>
                </tr>
                <tr>
                    <td class="content">
                        <h2 style="margin:0; color: #ffffff;">Access Verification</h2>
                        <p style="color: #8b949e; line-height: 1.6; margin-top: 15px;">Hello <strong>${name}</strong>,<br>An operative has requested a secure bridge to your dashboard. Use the authorization code below to clear the security protocol.</p>
                        
                        <div class="otp-container">
                            <h1 class="otp-code">${otp}</h1>
                        </div>
                        
                        <p style="color: #ef4444; font-size: 12px; font-weight: bold;">This code expires in 10 minutes.</p>
                        <p style="color: #8b949e; font-size: 12px; margin-top: 25px;">If you did not request this code, please ignore this transmission.</p>
                    </td>
                </tr>
                <tr>
                    <td class="footer">
                        <p style="margin: 0;">© 2026 ENIGMA TACTICAL CHALLENGE | Developed by Md Kaif</p>
                        <p style="margin: 5px 0 0 0;">Secure encrypted communication automated by <span class="btn">Enigma Node Server</span></p>
                    </td>
                </tr>
            </table>
        </div>
    </body>
    </html>
    `;
};