import { fileURLToPath } from 'url';
import path from 'path';
import { cmd } from '../command.js';

import config from '../config.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


cmd({
    pattern: "gstatus2",
    alias: ["statusgc2", "gcstatus2", "gstatus2"],
    desc: "Broadcast a status (text or media) to ALL groups the bot is in, mentioning all members.",
    category: "group",
    react: "📡",
    filename: __filename
}, async (conn, mek, m, { from, text, reply, isCreator }) => {

    // ── Owner only ──────────────────────────────────────────────────────────
    if (!isCreator) {
        return reply("❌ This command is only for the *bot owner*!");
    }

    try {
        const caption = text?.trim() || "";
        const quotedMsg = m.quoted;
        const mimeType = quotedMsg
            ? (quotedMsg.msg || quotedMsg).mimetype || ""
            : "";

        // ── Must have something to send ─────────────────────────────────────
        if (!quotedMsg && !caption) {
            return reply(
                `📡 *Broadcast Status — Usage:*\n\n` +
                `*Text only:*\n` +
                `  \`.gstatus Hello everyone! 🎉\`\n\n` +
                `*Media + caption:*\n` +
                `  Reply to an image/video with \`.gstatus Your caption here\`\n\n` +
                `*Media without caption:*\n` +
                `  Reply to any media with \`.gstatus\`\n\n` +
                `━━━━━━━━━━━━━━━━━━\n` +
                `~ *${config.BOT_NAME}*`
            );
        }

        // ── Fetch all groups the bot is in ──────────────────────────────────
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

        const allChats = await conn.groupFetchAllParticipating();
        const allGroups = Object.values(allChats);

        if (!allGroups || allGroups.length === 0) {
            return reply("❌ The bot is not in any groups right now.");
        }

        // ── Download media once (if any) ────────────────────────────────────
        let mediaBuffer = null;
        if (quotedMsg) {
            mediaBuffer = await quotedMsg.download();
            if (!mediaBuffer) {
                return reply("❌ Failed to download the media. Please try again.");
            }
        }

        // ── Helper: detect message type from mimeType or fallback ───────────
        const getMsgType = () => {
            if (mimeType.startsWith("image/")) return "image";
            if (mimeType.startsWith("video/")) return "video";
            if (mimeType.startsWith("audio/")) return "audio";
            // fallback via quoted message type key
            const msgType = Object.keys(quotedMsg?.message || {})[0] || "";
            if (msgType === "imageMessage") return "image";
            if (msgType === "videoMessage") return "video";
            if (msgType === "audioMessage" || msgType === "pttMessage") return "audio";
            return null;
        };

        const isPTT =
            quotedMsg?.message?.audioMessage?.ptt ||
            Object.keys(quotedMsg?.message || {})[0] === "pttMessage" ||
            false;

        // ── Broadcast to every group ────────────────────────────────────────
        let successCount = 0;
        let failCount = 0;

        for (const group of allGroups) {
            const groupId = group.id;

            try {
                // Get all participant JIDs for mention
                const mentionedJid = (group.participants || []).map(p => p.id);

                const contextInfo = {
                    isGroupStatus: true,
                    mentionedJid: mentionedJid
                };

                let messageContent = {};

                if (mediaBuffer) {
                    const msgType = getMsgType();

                    if (msgType === "image") {
                        messageContent = {
                            image: mediaBuffer,
                            caption: caption || "",
                            mimetype: mimeType || "image/jpeg",
                            contextInfo
                        };
                    } else if (msgType === "video") {
                        messageContent = {
                            video: mediaBuffer,
                            caption: caption || "",
                            mimetype: mimeType || "video/mp4",
                            contextInfo
                        };
                    } else if (msgType === "audio") {
                        messageContent = {
                            audio: mediaBuffer,
                            mimetype: isPTT ? "audio/ogg; codecs=opus" : "audio/mp4",
                            ptt: isPTT,
                            contextInfo
                        };
                    } else {
                        // Unknown media type — skip this iteration safely
                        failCount++;
                        continue;
                    }
                } else {
                    // Text only
                    messageContent = {
                        text: caption,
                        contextInfo
                    };
                }

                await conn.sendMessage(groupId, messageContent);
                successCount++;

                // Small delay between sends to avoid rate-limiting
                await new Promise(r => setTimeout(r, 800));

            } catch (groupErr) {
                console.error(`Broadcast failed for group ${groupId}:`, groupErr.message);
                failCount++;
            }
        }

        // ── Done — send summary ─────────────────────────────────────────────
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });

        reply(
            `✅ *Broadcast Complete!*\n\n` +
            `📡 *Total Groups:* ${allGroups.length}\n` +
            `✔️ *Sent Successfully:* ${successCount}\n` +
            `❌ *Failed:* ${failCount}\n\n` +
            `━━━━━━━━━━━━━━━━━━\n` +
            `~ *${config.BOT_NAME}*`
        );

    } catch (error) {
        console.error("BroadcastStatus Error:", error);
        await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
        reply(`❌ *Error:* ${error.message}`);
    }
});