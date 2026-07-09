import { fileURLToPath } from 'url';
import { cmd } from '../command.js';

import config from '../config.js';
const __filename = fileURLToPath(import.meta.url);


// ═══════════════════════════════════════════════════════════
// 😂 JAO COMMAND - RANDOM FUN PIC
// ═══════════════════════════════════════════════════════════
cmd(
    {
        pattern: "l",
        desc: "Send a random fun pic.",
        category: "attitude",
        react: "🥕",
        filename: __filename,
        use: "",
    },
    async (conn, mek, m, { reply }) => {
        try {
            // Random pic array
            const pics = [
                "https://i.ibb.co/4ZSm9ztB/ERFAN-MD.jpg",
                "https://i.ibb.co/s9DLFXPP/ERFAN-MD.jpg",
                "https://i.ibb.co/bjNFLtSv/ERFAN-MD.jpg",
                "https://i.ibb.co/67xjmC61/ERFAN-MD.jpg",
                "https://i.ibb.co/m50G38Vc/ERFAN-MD.jpg",
                "https://i.ibb.co/JjzsJ3J2/ERFAN-MD.jpg",
                "https://i.ibb.co/F4Z85G9h/ERFAN-MD.jpg",
                "https://i.ibb.co/1JZR8Bs1/ERFAN-MD.jpg",
                "https://i.ibb.co/JR7HjKnT/ERFAN-MD.jpg",
                "https://i.ibb.co/C32c31nw/ERFAN-MD.jpg",
                "https://i.ibb.co/SXbvt1Xf/ERFAN-MD.jpg",
                "https://i.ibb.co/yc93MF9Z/ERFAN-MD.jpg",
                "https://i.ibb.co/svb5zt3D/ERFAN-MD.jpg",
                "https://i.ibb.co/YBkPjbjy/ERFAN-MD.jpg",
                "https://i.ibb.co/yB8gKbcF/ERFAN-MD.jpg",
                "https://i.ibb.co/yFS1FXM3/ERFAN-MD.jpg",
                "https://i.ibb.co/YBRd9vcY/ERFAN-MD.jpg",
                "https://i.ibb.co/zVym6Lqt/ERFAN-MD.jpg",
                "https://i.ibb.co/ZqnJkKf/ERFAN-MD.jpg",
                "https://i.ibb.co/mgpsQGG/ERFAN-MD.jpg"
            ];

            // Pick random pic
            const randomPic = pics[Math.floor(Math.random() * pics.length)];

            // Send image
            await conn.sendMessage(
                mek.chat,
                { 
                    image: { url: randomPic }, 
                    caption: `> ${config.BOT_NAME} 🖤` 
                },
                { quoted: mek }
            );

        } catch (error) {
            console.error("❌ Error in .jao command:", error);
            reply("❌ *Error in .jao command:*
" + error.message);
        }
    }
);