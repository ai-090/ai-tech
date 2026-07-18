import { fileURLToPath } from 'url';
import path from 'path';
import { cmd } from '../command.js';
import axios from 'axios';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cmd({
    pattern: "screenshot",
    alias: ["ss", "ssweb", "webshots"],
    desc: "Capture a screenshot of a website and send it on WhatsApp",
    category: "tools",
    react: "🖼️",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        // Validate input
        if (!q) return reply("Please provide a website URL to capture.\nExample: `.screenshot https://example.com`");

        // API endpoint
        const apiUrl = `https://api.elrayyxml.web.id/api/tools/ssweb?url=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        // Validate API response
        if (!data || !data.result || !data.result.file_url) {
            await react("❌");
            return reply("Failed to capture the screenshot. Please check the URL or try again later.");
        }

        const screenshotUrl = data.result.file_url;

        // Notify user while downloading
        await reply(
            `📸 *Taking Screenshot...*\n\n` +
            `🧑‍💻 *Author:* ${data.author || 'Unknown'}\n` +
            `🌐 *Website:* ${q}\n\n` +
            `Please wait while the screenshot is being fetched...`
        );

        // Download screenshot image
        const response = await axios.get(screenshotUrl, { responseType: 'arraybuffer' });

        // Send the screenshot image
        await conn.sendMessage(from, {
            image: Buffer.from(response.data),
            caption: `🖼️ *Website Screenshot Captured Successfully!*\n🌐 URL: ${q}`
        }, { quoted: mek });

        await react("✅");

    } catch (e) {
        console.error("Error in Screenshot command:", e);
        await react("❌");
        reply("An error occurred while capturing or sending the screenshot.");
    }
});
