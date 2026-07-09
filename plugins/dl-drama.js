import { fileURLToPath } from 'url';
import path from 'path';
import { cmd } from '../command.js';
import yts from 'yt-search';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cmd({
    pattern: "drama",
    alias: ["ytDrama", "ytmdrama", "dzdrama"],
    desc: "Download YouTube drama in high quality (Dark Zone MD)",
    category: "download",
    react: "🍿",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply(`
🌸 *DRAMA DOWNLOADER – DARK ZONE MD* 🌸

🎬 Please provide a drama name or YouTube URL!

💡 Example:
\`.drama Kaisi Teri Khudgarzi Episode 1\`
        `);

        let url = q;
        let videoInfo = null;

        // Detect URL or title
        if (q.startsWith('http://') || q.startsWith('https://')) {
            if (!q.includes("youtube.com") && !q.includes("youtu.be"))
                return await reply("❌ Please provide a valid YouTube drama URL!");
            const videoId = getVideoId(q);
            if (!videoId) return await reply("❌ Invalid YouTube URL!");
            const searchFromUrl = await yts({ videoId: videoId });
            videoInfo = searchFromUrl;
        } else {
            const search = await yts(q + " drama full episode");
            if (!search.videos || search.videos.length === 0)
                return await reply("😢 No drama found with that name!");
            videoInfo = search.videos[0];
            url = videoInfo.url;
        }

        function getVideoId(url) {
            const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
            return match ? match[1] : null;
        }

        // Send fancy preview
        await conn.sendMessage(from, {
            image: { url: videoInfo.thumbnail },
            caption: `
╔═══════════◇🌙◇═════════╗
     *🎭 DRAMA DOWNLOADER 🎭*
╚═══════════◇🌙◇═════════╝

📺 *Title:* ${videoInfo.title}
🕒 *Duration:* ${videoInfo.timestamp}
👁️ *Views:* ${videoInfo.views.toLocaleString()}
🔗 *Source:* YouTube

⏳ _Fetching download link..._
            `
        }, { quoted: mek });

        // Download via API
        const api = `https://jawad-tech.vercel.app/download/ytdl?url=${encodeURIComponent(url)}`;
        const res = await axios.get(api);
        const data = res.data;

        // Smart Check: Look for the new format, then old format, then any available video link
        let downloadLink = data?.result?.download_url || data?.result?.mp4 || data?.result?.download;
        
        // Fallback: If the result is an object with multiple qualities, pick the best one
        if (!downloadLink && data?.result) {
            const qualities = ['720', '480', '360'];
            for (let q of qualities) {
                if (data.result[q]) {
                    downloadLink = data.result[q];
                    break;
                }
            }
        }

        if (!downloadLink) {
            // Log the exact API response in your console so you can see what it's actually returning
            console.log("API RESPONSE ERROR:", JSON.stringify(data, null, 2));
            return await reply("⚠️ Could not get the drama file. The API might be down or the video is restricted.");
        }

        const title = data?.result?.title || videoInfo.title;

        // Send as a video
        await conn.sendMessage(from, {
            video: { url: downloadLink },
            mimetype: 'video/mp4',
            caption: `
✨ *${title}*  
🎬 Your requested drama is ready!

🖤 *Enjoy Watching With*  
『🔥 DARK ZONE MD 🔥』
            `
        }, { quoted: mek });

        // Success react
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (err) {
        console.error("❌ Error in .drama command:", err);
        await reply("⚠️ Oops! Something went wrong while fetching your drama!");
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
});