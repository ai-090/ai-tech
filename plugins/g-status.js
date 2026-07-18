import { fileURLToPath } from 'url';
import path from 'path';
import { cmd } from '../command.js';

import config from '../config.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


cmd({
    pattern: "gstatus",
    alias: ["statusgc", "groupstatus", "gstatus"],
    desc: "Post a status (text or media) to the current group silently.",
    category: "group",
    react: "📡",
    filename: __filename
}, async (conn, mek, m, { from, text, reply, isCreator }) => {

    // ── Owner only ──────────────────────────────────────────────────────────
    if (!isCreator) {
        return reply("❌ This command is only for the *bot owner*!");
    }

    // ── Group only ──────────────────────────────────────────────────────────
    if (!from.endsWith('@g.us')) {
        return reply("❌ This command can only be used in *group chats*!");
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
                `📡 *Group Status — Usage:*\n\n` +
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

        // ── Download media once (if any) ────────────────────────────────────
        let mediaBuffer = null;
        if (quotedMsg) {
            mediaBuffer = await quotedMsg.download();
            if (!mediaBuffer) {
                return reply("❌ Failed to download the media. Please try again.");
            }
        }

        // ── Helper: detect message type ──────────────────────────────────────
        const getMsgType = () => {
            if (mimeType.startsWith("image/")) return "image";
            if (mimeType.startsWith("video/")) return "video";
            if (mimeType.startsWith("audio/")) return "audio";
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

        // ── Get all participant JIDs for mention ────────────────────────────
        const groupMetadata = await conn.groupMetadata(from);
        const mentionedJid = (groupMetadata.participants || []).map(p => p.id);

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
                return reply("❌ Unknown media type. Please reply to image/video/audio.");
            }
        } else {
            // Text only
            messageContent = {
                text: caption,
                contextInfo
            };
        }

        // ── Post status to current group ONLY ───────────────────────────────
        await conn.sendMessage(from, messageContent);

        // ── NO REPLY MESSAGE ────────────────────────────────────────────────
        // Status posted silently, no confirmation message sent

    } catch (error) {
        console.error("GroupStatus Error:", error);
        reply(`❌ *Error:* ${error.message}`);
    }
});