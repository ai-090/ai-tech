import { fileURLToPath } from 'url';
import path from 'path';
import { cmd } from '../command.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cmd({
  pattern: "del",
  alias: ["delete"],
  desc: "Delete any message",
  react: "🗑️",
  category: "admin",
  filename: __filename
}, async (conn, mek, m, { reply, quoted }) => {
  
  // Method 1: Check quoted from handler
  if (quoted && quoted.key) {
    try {
      await conn.sendMessage(mek.chat, { delete: quoted.key });
      return;
    } catch (e) {}
  }

  // Method 2: Check message context directly
  const context = mek.message?.extendedTextMessage?.contextInfo;
  
  if (context && context.stanzaId) {
    try {
      await conn.sendMessage(mek.chat, { 
        delete: {
          remoteJid: mek.chat,
          id: context.stanzaId,
          participant: context.participant,
          fromMe: false
        }
      });
      return;
    } catch (e) {}
  }

  // Method 3: Check m.quoted
  if (m.quoted && m.quoted.key) {
    try {
      await conn.sendMessage(mek.chat, { delete: m.quoted.key });
      return;
    } catch (e) {}
  }

  // If nothing worked
  reply("❌ Reply to a message!");
});
