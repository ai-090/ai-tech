import { fileURLToPath } from 'url';
import path from 'path';
import { cmd } from '../command.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================
// BLOCK COMMAND - FIXED VERSION
// ============================================

cmd({
    pattern: "block",
    desc: "Block a user",
    category: "owner",
    react: "🚫",
    filename: __filename
}, async (conn, mek, m, { reply, quoted, args, react }) => {
    
    // Check if owner
    const botOwner = conn.user.id.split(":")[0] + "@s.whatsapp.net";
    if (mek.sender !== botOwner) {
        await react("❌");
        return reply("*❌ Only bot owner can use this command!*");
    }

    let jid;

    // Method 1: Check quoted from handler
    if (quoted && quoted.sender) {
        jid = quoted.sender;
    }
    // Method 2: Check m.quoted
    else if (m.quoted && m.quoted.sender) {
        jid = m.quoted.sender;
    }
    // Method 3: Check message context directly
    else if (mek.message?.extendedTextMessage?.contextInfo?.participant) {
        jid = mek.message.extendedTextMessage.contextInfo.participant;
    }
    // Method 4: Check mentioned users
    else if (m.mentionedJid && m.mentionedJid.length > 0) {
        jid = m.mentionedJid[0];
    }
    // Method 5: Manual JID from text
    else if (args[0]) {
        // Handle @mention format
        if (args[0].includes("@")) {
            jid = args[0].replace(/[@\s]/g, '') + "@s.whatsapp.net";
        } 
        // Handle plain number
        else {
            jid = args[0].replace(/[^0-9]/g, '') + "@s.whatsapp.net";
        }
    }
    else {
        await react("❌");
        return reply("*❌ Usage:*\n\n1. Reply to user's message\n2. Mention user with @\n3. Type number: `.block 923001234567`");
    }

    try {
        // Block the user
        await conn.updateBlockStatus(jid, "block");
        await react("✅");
        await reply(`*✅ Successfully blocked!*\n\n@${jid.split("@")[0]} has been blocked.`, { 
            mentions: [jid] 
        });
    } catch (error) {
        console.error("Block Error:", error);
        await react("❌");
        await reply("*❌ Failed to block user!*\n\n_Error: " + error.message + "_");
    }
});

// ============================================
// UNBLOCK COMMAND - FIXED VERSION
// ============================================

cmd({
    pattern: "unblock",
    desc: "Unblock a user",
    category: "owner",
    react: "🔓",
    filename: __filename
}, async (conn, mek, m, { reply, quoted, args, react }) => {
    
    // Check if owner
    const botOwner = conn.user.id.split(":")[0] + "@s.whatsapp.net";
    if (mek.sender !== botOwner) {
        await react("❌");
        return reply("*❌ Only bot owner can use this command!*");
    }

    let jid;

    // Method 1: Check quoted from handler
    if (quoted && quoted.sender) {
        jid = quoted.sender;
    }
    // Method 2: Check m.quoted
    else if (m.quoted && m.quoted.sender) {
        jid = m.quoted.sender;
    }
    // Method 3: Check message context directly
    else if (mek.message?.extendedTextMessage?.contextInfo?.participant) {
        jid = mek.message.extendedTextMessage.contextInfo.participant;
    }
    // Method 4: Check mentioned users
    else if (m.mentionedJid && m.mentionedJid.length > 0) {
        jid = m.mentionedJid[0];
    }
    // Method 5: Manual JID from text
    else if (args[0]) {
        // Handle @mention format
        if (args[0].includes("@")) {
            jid = args[0].replace(/[@\s]/g, '') + "@s.whatsapp.net";
        } 
        // Handle plain number
        else {
            jid = args[0].replace(/[^0-9]/g, '') + "@s.whatsapp.net";
        }
    }
    else {
        await react("❌");
        return reply("*❌ Usage:*\n\n1. Reply to user's message\n2. Mention user with @\n3. Type number: `.unblock 923001234567`");
    }

    try {
        // Unblock the user
        await conn.updateBlockStatus(jid, "unblock");
        await react("✅");
        await reply(`*✅ Successfully unblocked!*\n\n@${jid.split("@")[0]} has been unblocked.`, { 
            mentions: [jid] 
        });
    } catch (error) {
        console.error("Unblock Error:", error);
        await react("❌");
        await reply("*❌ Failed to unblock user!*\n\n_Error: " + error.message + "_");
    }
});

// ============================================
// BLOCK LIST COMMAND (BONUS)
// ============================================

cmd({
    pattern: "blocklist",
    alias: ["listblock", "blocked"],
    desc: "Show list of blocked users",
    category: "owner",
    react: "📋",
    filename: __filename
}, async (conn, mek, m, { reply, react }) => {
    
    // Check if owner
    const botOwner = conn.user.id.split(":")[0] + "@s.whatsapp.net";
    if (mek.sender !== botOwner) {
        await react("❌");
        return reply("*❌ Only bot owner can use this command!*");
    }

    try {
        // Fetch blocked contacts
        const blockedList = await conn.fetchBlocklist();
        
        if (!blockedList || blockedList.length === 0) {
            await react("✅");
            return reply("*📋 Blocked List*\n\n_No users are currently blocked._");
        }

        let list = "*📋 Blocked Users List*\n\n";
        list += `*Total:* ${blockedList.length}\n\n`;
        
        blockedList.forEach((jid, index) => {
            list += `${index + 1}. @${jid.split("@")[0]}\n`;
        });

        await react("✅");
        await reply(list, { mentions: blockedList });
        
    } catch (error) {
        console.error("Blocklist Error:", error);
        await react("❌");
        await reply("*❌ Failed to fetch blocked list!*");
    }
});
