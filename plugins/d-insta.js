// plugins/download.js - ESM Version
import { fileURLToPath } from 'url';
import { cmd } from '../command.js';
import config from '../config.js';
import axios from 'axios';
import yts from 'yt-search';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { File } from 'megajs';
import converter from '../lib/converter.js';

const __filename = fileURLToPath(import.meta.url);

// Helper function to extract video ID
function getVideoId(url) {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
}


cmd({
    pattern: "instagram",
    alias: ["igdl", "ig", "instadl"],
    react: '📥',
    desc: "Download videos from Instagram (API v5)",
    category: "download",
    use: ".igdl2 <Instagram video URL>",
    filename: __filename
}, async (conn, mek, m, { from, reply, args, userConfig }) => {
    try {
        const igUrl = args[0];
        if (!igUrl || !igUrl.includes("instagram.com")) {
            return reply('❌ Please provide a valid Instagram video URL.\n\nExample:\n.igdl2 https://instagram.com/reel/...');
        }

        // Get DESCRIPTION from userConfig if available, otherwise use config.DESCRIPTION
        const DESCRIPTION = userConfig?.DESCRIPTION || config.DESCRIPTION || "";

        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

        const apiUrl = `https://jawad-tech.vercel.app/downloader?url=${encodeURIComponent(igUrl)}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data.status || !data.result || !Array.isArray(data.result)) {
            return reply('❌ Unable to fetch the video. Please check the URL and try again.');
        }

        const videoUrl = data.result[0];
        if (!videoUrl) return reply("❌ No video found in the response.");

        const metadata = data.metadata || {};
        const author = metadata.author || "Unknown";
        const caption = metadata.caption ? metadata.caption.slice(0, 300) + "..." : "No caption provided.";
        const likes = metadata.like || 0;
        const comments = metadata.comment || 0;

        await reply('Downloading Instagram video...Please wait.📥');

        await conn.sendMessage(from, {
            video: { url: videoUrl },
            caption: `📥 *Instagram Reel Downloader*\n👤 *Author:* ${author}\n💬 *Caption:* ${caption}\n❤️ *Likes:* ${likes} | 💭 *Comments:* ${comments}\n\n> ${DESCRIPTION}`
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
    } catch (error) {
        console.error('IGDL2 Error:', error);
        reply('❌ Failed to download the Instagram video. Please try again later.');
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
});
