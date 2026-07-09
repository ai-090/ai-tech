import { fileURLToPath } from 'url';
import path from 'path';
import axios from 'axios';
import { cmd } from '../command.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


cmd({
    pattern: "marige",
    alias: ["shadi", "marriage", "wedding"],
    desc: "Randomly pairs two users for marriage with a wedding GIF",
    react: "💍",
    category: "fun",
    filename: __filename
}, async (conn, mek, store, { isGroup, reply, sender }) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups!");

        // Get group metadata properly
        const groupMetadata = await conn.groupMetadata(mek.chat);
        const participants = groupMetadata.participants.map(user => user.id);
        
        // Filter out the sender and bot number
        const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net';
        const eligibleParticipants = participants.filter(id => id !== sender && id !== botNumber);
        
        if (eligibleParticipants.length < 1) {
            return reply("❌ Not enough participants to perform a marriage!");
        }

        // Select random partner
        const randomIndex = Math.floor(Math.random() * eligibleParticipants.length);
        const randomPair = eligibleParticipants[randomIndex];

        // ╔══════════════════════════════════════════════════════════╗
        // ║  DELIRIUS API - KISS REACTION (Direct MP4)               ║
        // ╚══════════════════════════════════════════════════════════╝
        const apiUrl = "https://api.delirius.store/reactions/kiss";
        let res = await axios.get(apiUrl);
        
        if (!res.data?.status || !res.data?.data?.url) {
            throw new Error("API response invalid");
        }

        let videoUrl = res.data.data.url;

        const message = `💍 *Shadi Mubarak!* 💒\n\n👰 @${sender.split("@")[0]} + 🤵 @${randomPair.split("@")[0]}\n\nMay you both live happily ever after! 💖`;

        await conn.sendMessage(
            mek.chat,
            { 
                video: { url: videoUrl }, 
                caption: message, 
                gifPlayback: true, 
                mentions: [sender, randomPair] 
            },
            { quoted: mek }
        );

    } catch (error) {
        console.error("❌ Error in .marige command:", error);
        reply("❌ *Error in .marige command:*\n" + error.message);
    }
});