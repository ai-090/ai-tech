import { fileURLToPath } from 'url';
import yts from 'yt-search';
import axios from 'axios';
import { cmd } from '../command.js';

const __filename = fileURLToPath(import.meta.url);


const API_CONFIG = {
    AUDIO_API: Buffer.from("aHR0cHM6Ly95dC1kbC5vZmZpY2lhbGhlY3Rvcm1hbnVlbC53b3JrZXJzLmRldi8/dXJsPQ==", "base64").toString()
};

/**
 * Normalizes YouTube URLs to a standard format
 */
function normalizeYouTubeUrl(url) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/shorts\/|youtube\.com\/.*[?&]v=)([a-zA-Z0-9_-]{11})/);
  return match ? `https://youtube.com/watch?v=${match[1]}` : null;
}

/**
 * Core Data Fetching Logic for Audio
 */
async function fetchAudioData(url, retries = 2) {
  try {
    const apiUrl = `${API_CONFIG.AUDIO_API}${encodeURIComponent(url)}`;
    const response = await axios.get(apiUrl, { timeout: 20000 });
    const data = response.data;

    if (data.status === true && data.audio) {
      return {
        audio_url: data.audio,
        title: data.title || "YouTube Audio",
      };
    }
    throw new Error("API failed to return audio link.");
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return fetchAudioData(url, retries - 1);
    }
    return null;
  }
}

// --- MAIN COMMAND: PLAY ---

cmd(
  {
    pattern: "play2",
    alias: ["music2", "ytmp3", "audio2", "song2"],
    react: "🎧",
    desc: "Search and download high-quality audio from YouTube.",
    category: "download",
    filename: __filename,
  },
  async (conn, mek, m, { from, q, reply, prefix, command }) => {
    try {
      if (!q) return reply(`🎧 *Audio Downloader*

Usage: \`${prefix + command} <name or link>\`
Example: \`${prefix + command} perfect ed sheeran\``);

      await conn.sendMessage(from, { react: { text: "🔍", key: mek.key } });

      // Step 1: Search for the song
      const url = normalizeYouTubeUrl(q);
      let ytdata;

      if (url) {
        const searchResults = await yts({ videoId: q.split('v=')[1]?.split('&')[0] || q.split('/').pop() });
        ytdata = searchResults;
      } else {
        const searchResults = await yts(q);
        if (!searchResults.videos.length) return reply("❌ No songs found for your query!");
        ytdata = searchResults.videos[0];
      }

      // Step 2: Send info message
      const infoText = `
🎧 *YT AUDIO DOWNLOADER* 🎧

📌 *Title:* ${ytdata.title}
🎬 *Channel:* ${ytdata.author?.name || 'Unknown'}
⏱️ *Duration:* ${ytdata.timestamp}
👁️ *Views:* ${ytdata.views.toLocaleString()}

_📥 Processing your audio file, please wait..._

> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ERFAN`;

      await conn.sendMessage(from, { image: { url: ytdata.thumbnail || ytdata.image }, caption: infoText }, { quoted: mek });
      await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

      // Step 3: Fetch download link from API
      const dlData = await fetchAudioData(ytdata.url);

      if (!dlData || !dlData.audio_url) {
        await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
        return reply("❌ Download link could not be generated. Please try again later.");
      }

      // Step 4: Send the Audio file
      await conn.sendMessage(
        from,
        {
          audio: { url: dlData.audio_url },
          mimetype: "audio/mpeg",
          fileName: `${dlData.title}.mp3`,
          ptt: false
        },
        { quoted: mek }
      );

      await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });

    } catch (e) {
      console.error("Audio DL Error:", e);
      await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
      reply(`⚠️ *Error:* ${e.message || "Something went wrong."}`);
    }
  }
);