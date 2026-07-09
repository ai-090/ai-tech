import { fileURLToPath } from 'url';
import config from '../config.js';
import { cmd, commands } from '../command.js';
import path from 'path';
import os from 'os';
import fs from 'fs';
import {runtime} from '../lib/functions.js';
import axios from 'axios';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function for small caps text
const toSmallCaps = (text) => {
    if (!text || typeof text !== 'string') return '';
    const smallCapsMap = {
        'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ғ', 'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ',
        'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ǫ', 'r': 'ʀ',
        's': 's', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x', 'y': 'ʏ', 'z': 'ᴢ',
        'A': 'ᴀ', 'B': 'ʙ', 'C': 'ᴄ', 'D': 'ᴅ', 'E': 'ᴇ', 'F': 'ғ', 'G': 'ɢ', 'H': 'ʜ', 'I': 'ɪ',
        'J': 'ᴊ', 'K': 'ᴋ', 'L': 'ʟ', 'M': 'ᴍ', 'N': 'ɴ', 'O': 'ᴏ', 'P': 'ᴘ', 'Q': 'ǫ', 'R': 'ʀ',
        'S': 's', 'T': 'ᴛ', 'U': 'ᴜ', 'V': 'ᴠ', 'W': 'ᴡ', 'X': 'x', 'Y': 'ʏ', 'Z': 'ᴢ'
    };
    return text.split('').map(char => smallCapsMap[char] || char).join('');
};

// Format category with sidebar design from Menu 2
const formatCategory = (category, cmds) => {
    // Filter out commands with empty or undefined patterns
    const validCmds = cmds.filter(cmd => cmd.pattern && cmd.pattern.trim() !== '');
    
    if (validCmds.length === 0) return ''; // Skip empty categories
    
    let title = `\n▰▰▰❰ ${toSmallCaps(category.toUpperCase())} ❱▰▰▰\n║\n`;
    let body = validCmds.map(cmd => {
        const commandName = cmd.pattern || '';
        return `➤ ─ ${toSmallCaps(commandName)}`;
    }).join('\n');
    let footer = `\n➤\n▰▰▰▰▰▰▰▰▰▰▰▰▰`;
    return `${title}${body}${footer}`;
};

// Improved function to validate and fetch image URL
const validateAndFetchImage = async (url) => {
    if (!url || typeof url !== 'string' || url.trim() === '') {
        return { valid: false };
    }
    
    try {
        // More lenient URL validation - just check if it looks like a URL
        const urlPattern = /^https?:\/\/.+/i;
        if (!urlPattern.test(url.trim())) {
            return { valid: false };
        }

        // Try to fetch the image with increased timeout and follow redirects
        const response = await axios.get(url, {
            timeout: 10000, // 10 seconds timeout
            maxRedirects: 5,
            responseType: 'arraybuffer', // Get image as buffer
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'image/*,*/*'
            },
            validateStatus: (status) => status < 400 // Accept any status < 400
        });

        // Check if response is actually an image
        const contentType = response.headers['content-type'];
        if (contentType && contentType.startsWith('image/')) {
            return { 
                valid: true, 
                buffer: Buffer.from(response.data),
                contentType: contentType 
            };
        }
        
        return { valid: false };
    } catch (error) {
        console.log('Image validation failed:', error.message);
        return { valid: false };
    }
};

cmd({
    pattern: "menu",
    alias: ["m", "help", "allmenu","fullmenu"],
    use: '.menu',
    desc: "Show all bot commands",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply, userConfig }) => {
    try {
        // Show typing presence before processing
        await conn.sendPresenceUpdate('composing', from);
        
        let totalCommands = Object.keys(commands).length;
        
        // Get all unique categories and filter out undefined/null categories
        const categories = [...new Set(Object.values(commands).map(c => c.category))].filter(cat => 
            cat && cat.trim() !== '' && cat !== 'undefined'
        );
        
        // Organize commands by category and filter out empty categories
        const categorized = {};
        categories.forEach(cat => {
            const categoryCommands = Object.values(commands).filter(c => c.category === cat);
            // Only add category if it has valid commands
            const validCommands = categoryCommands.filter(cmd => cmd.pattern && cmd.pattern.trim() !== '');
            if (validCommands.length > 0) {
                categorized[cat] = validCommands;
            }
        });

        // Build menu sections - only for categories that have commands
        let menuSections = '';
        for (const [category, cmds] of Object.entries(categorized)) {
            if (cmds && cmds.length > 0) {
                const section = formatCategory(category, cmds);
                if (section !== '') {
                    menuSections += section;
                }
            }
        }

        // Get all values from userConfig with fallback to config
        const BOT_NAME = userConfig?.BOT_NAME || config.BOT_NAME || "Bot";
        const OWNER_NAME = userConfig?.OWNER_NAME || config.OWNER_NAME || "Owner";
        const PREFIX = userConfig?.PREFIX || config.PREFIX || ".";
        const MODE = userConfig?.MODE || config.MODE || "private";
        const VERSION = userConfig?.VERSION || config.VERSION || "1.0.0";
        const DESCRIPTION = userConfig?.DESCRIPTION || config.DESCRIPTION || "";
        
        // Get BOT_IMAGE from userConfig first, then config.BOT_IMAGE, then config.BOT_MEDIA_URL
        const BOT_IMAGE = userConfig?.BOT_IMAGE || userConfig?.BOT_MEDIA_URL || config.BOT_IMAGE || config.BOT_MEDIA_URL;
        
        // Main menu text with sidebar design from Menu 2
        let dec = `▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
➤  ${BOT_NAME}
▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

▰▰▰❰ 🤖 ʙᴏᴛ ɪɴғᴏ ❱▰▰▰
➤ 👑 ${toSmallCaps('Owner')}: ${OWNER_NAME}
➤ 📜 ${toSmallCaps('Commands')}: ${totalCommands}
➤ ⏱️ ${toSmallCaps('Runtime')}: ${runtime(process.uptime())}
➤ 📦 ${toSmallCaps('Prefix')}: ${PREFIX}
➤ ⚙️ ${toSmallCaps('Mode')}: ${MODE}
➤ 🏷️ ${toSmallCaps('Version')}: ${VERSION}
▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
${menuSections}

> ${DESCRIPTION || ''}`;

        // Determine which image to use
        let imageToSend;
        const localImagePath = path.join(__dirname, '../lib/ERFAN.jpg');
        
        // Try to validate and fetch the custom image
        const imageValidation = await validateAndFetchImage(BOT_IMAGE);
        
        if (imageValidation.valid) {
            // Use the fetched image buffer
            imageToSend = imageValidation.buffer;
        } else {
            // Use local image
            if (fs.existsSync(localImagePath)) {
                imageToSend = fs.readFileSync(localImagePath);
            } else {
                // If local image also doesn't exist, send text only
                return await conn.sendMessage(from, { 
                    text: dec,
                    contextInfo: { 
                        mentionedJid: [m.sender], 
                        forwardingScore: 999, 
                        isForwarded: true, 
                        forwardedNewsletterMessageInfo: { 
                            newsletterJid: '120363416743041101@newsletter', 
                            newsletterName: BOT_NAME, 
                            serverMessageId: 143 
                        } 
                    } 
                }, { quoted: mek });
            }
        }

        // Send message with image
        await conn.sendMessage(from, { 
            image: imageToSend,
            caption: dec, 
            contextInfo: { 
                mentionedJid: [m.sender], 
                forwardingScore: 999, 
                isForwarded: true, 
                forwardedNewsletterMessageInfo: { 
                    newsletterJid: '120363416743041101@newsletter', 
                    newsletterName: BOT_NAME, 
                    serverMessageId: 143 
                } 
            } 
        }, { quoted: mek });

    } catch (e) { 
        console.log(e); 
        reply(`Error: ${e}`); 
    } 
});
