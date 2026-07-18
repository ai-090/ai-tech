import { fileURLToPath } from 'url';
import path from 'path';
import { cmd } from '../command.js';
import axios from 'axios';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cmd({
    pattern: "removebg",
    alias: ["rmbg", "bgremove"],
    desc: "Remove background from an image (Dark Zone MD)",
    category: "tools",
    react: "✂️",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        let imageUrl;

        // Case 1: Reply to an image
        if (m.quoted && m.quoted.message && m.quoted.message.imageMessage) {
            imageUrl = await conn.downloadAndSaveMediaMessage(m.quoted, 'removebg');
        }

        // Case 2: Image URL provided
        if (q && q.startsWith("http")) {
            imageUrl = q;
        }

        if (!imageUrl) {
            return await reply(`
✂️ *REMOVE BACKGROUND – DARK ZONE MD* ✂️

📸 Reply to an image OR provide an image URL.

💡 Examples:
• Reply to image + \`.removebg\`
• \`.removebg https://image.jpg\`
            `);
        }

        // Processing message
        await conn.sendMessage(from, {
            text: `
╔═══════════◇✂️◇═════════╗
      *REMOVING BACKGROUND*
╚═══════════◇✂️◇═════════╝

🖼️ Image received  
⏳ Processing...
            `
        }, { quoted: mek });

        // If replied image, upload first (WhatsApp local file)
        if (!imageUrl.startsWith("http")) {
            const upload = await axios.post(
                "https://telegra.ph/upload",
                require("fs").createReadStream(imageUrl),
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            imageUrl = "https://telegra.ph" + upload.data[0].src;
        }

        // RemoveBG API (IMAGE RESPONSE)
        const api = `https://api.zenitsu.web.id/api/tools/removebg?imageUrl=${encodeURIComponent(imageUrl)}`;

        const res = await axios.get(api, { responseType: "arraybuffer" });

        if (!res.data)
            return await reply("⚠️ Failed to remove background!");

        const resultBuffer = Buffer.from(res.data);

        // Send final image
        await conn.sendMessage(from, {
            image: resultBuffer,
            caption: `
✨ *BACKGROUND REMOVED!*

✂️ Clean image generated  
📥 Downloaded & re-sent  

🖤 Powered By  
『🔥 DARK ZONE MD 🔥』
            `
        }, { quoted: mek });

        // Success reaction
        await conn.sendMessage(from, {
            react: { text: "✅", key: m.key }
        });

    } catch (err) {
        console.error("❌ RemoveBG Error:", err);
        await reply("⚠️ Something went wrong while removing background!");
        await conn.sendMessage(from, {
            react: { text: "❌", key: m.key }
        });
    }
});
