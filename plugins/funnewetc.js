import { fileURLToPath } from 'url';
import path from 'path';
import { cmd } from '../command.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================
// 💔 BREAKUP COMMAND
// ============================================
cmd({
  pattern: "breakup",
  alias: ["tudwa", "alg"],
  desc: "Randomly breaks up two people in the group",
  react: "💔",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups!");

    const participants = groupMetadata.participants;
    const eligible = participants.filter(p => !p.id.includes(conn.user.id.split('@')[0]));

    if (eligible.length < 2) return reply("❌ Not enough members for breakup drama! 😂");

    // Pick two random different users
    const shuffled = eligible.sort(() => 0.5 - Math.random());
    const user1 = shuffled[0];
    const user2 = shuffled[1];

    const breakupMessages = [
      `💔 *BREAKING NEWS - BREAKUP ALERT!* 💔\n\n@${user1.id.split('@')[0]} ne @${user2.id.split('@')[0]} ko *BLOCK* kar diya! 😭\nReason: "Tu bohot zyada WhatsApp status lagata/lagati hai!" 📱💀`,
      
      `💔 *Aaj ki Sabse Badi Khabar!* 💔\n\n@${user1.id.split('@')[0]} aur @${user2.id.split('@')[0]} ka *BREAKUP* ho gaya! 😱\nReason: "Usne mera last seen check kiya aur reply nahi kiya!" 👀❌`,
      
      `💔 *HEARTBREAK HOUR* 💔\n\n@${user2.id.split('@')[0]} ne @${user1.id.split('@')[0]} ko bol diya:\n*"Hum sirf dost hain!"* 🥶\n\nAur @${user1.id.split('@')[0]} ab *Sanju Baba* ki tarah ro raha/rahi hai! 😭🍷`,
      
      `💔 *Pyaar Mein Dhoka!* 💔\n\n@${user1.id.split('@')[0]} ne @${user2.id.split('@')[0]} ka\n*SCREENSHOT LEAK* kar diya group mein! 📸😈\nAb dono ki *Nahi Banti!* 🚫`
    ];

    const randomMsg = breakupMessages[Math.floor(Math.random() * breakupMessages.length)];

    await conn.sendMessage(
      mek.chat,
      {
        text: randomMsg,
        mentions: [user1.id, user2.id]
      },
      { quoted: mek }
    );

  } catch (error) {
    console.error("Error in .breakup command:", error);
    reply(`❌ Error: ${error.message}`);
  }
});

// ============================================
// 👨 HUSBAND COMMAND
// ============================================
cmd({
  pattern: "husband",
  alias: ["shauhar", "pati"],
  desc: "Randomly assigns a husband from the group",
  react: "💍",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups!");

    const participants = groupMetadata.participants;
    const eligible = participants.filter(p => !p.id.includes(conn.user.id.split('@')[0]));

    if (eligible.length < 1) return reply("❌ No eligible participants found!");

    const randomUser = eligible[Math.floor(Math.random() * eligible.length)];

    const husbandMessages = [
      `💍 *Mubarak Ho!* 💍\n\n@${randomUser.id.split('@')[0]} aapka *HUSBAND* ban gaya hai! 🎊\n\n✅ Salary saari dega\n✅ Kabhi argue nahi karega\n✅ Raat ko khana bhi banayega\n✅ TikTok nahi dekhega\n\n*Aise mard sirf fiction mein hote hain!* 😂💀`,

      `💍 *Aaj ki Lottery!* 💍\n\n@${randomUser.id.split('@')[0]} tumhara *SHAUHAR* hai! 👨\n\n⚠️ Warning:\n- Socks floor pe chhorega 🧦\n- Match dekhega sabse pehle ⚽\n- "5 minute mein aaya" = 2 ghante 😂\n\n*Phir bhi tumhara hai!* 💕`,

      `💍 *Rishta Pakka!* 💍\n\n*Congratulations!* 🎉\nTumhara *Dulha* hai @${randomUser.id.split('@')[0]}! 🤵\n\nHe is:\n👑 Handsome (thoda sa)\n💰 Rich (maybe)\n🍕 Pizza khilayega zaroor!\n❤️ Tumhara *FOREVER* ! 💕`
    ];

    const randomMsg = husbandMessages[Math.floor(Math.random() * husbandMessages.length)];

    await conn.sendMessage(
      mek.chat,
      {
        text: randomMsg,
        mentions: [randomUser.id]
      },
      { quoted: mek }
    );

  } catch (error) {
    console.error("Error in .husband command:", error);
    reply(`❌ Error: ${error.message}`);
  }
});

// ============================================
// 👩 WIFE COMMAND
// ============================================
cmd({
  pattern: "wife",
  alias: ["biwi", "bivi", "dulhan"],
  desc: "Randomly assigns a wife from the group",
  react: "👰",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups!");

    const participants = groupMetadata.participants;
    const eligible = participants.filter(p => !p.id.includes(conn.user.id.split('@')[0]));

    if (eligible.length < 1) return reply("❌ No eligible participants found!");

    const randomUser = eligible[Math.floor(Math.random() * eligible.length)];

    const wifeMessages = [
      `👰 *Biwi Mili!* 👰\n\n@${randomUser.id.split('@')[0]} tumhari *BIWI* ban gayi! 💍\n\n✨ Qualities:\n💄 Hamesha ready rahegi\n🍳 Khana banayegi (YouTube se recipe dekh ke)\n📱 Tumhara phone check zaroor karegi\n🛍️ Shopping ka shauk hai\n\n*Phir bhi duniya ki sabse achi hai!* ❤️`,

      `👰 *Shaadi Mubarak!* 🎊\n\nTumhari *DULHAN* hai @${randomUser.id.split('@')[0]}! 💕\n\n⚠️ Note:\n- "Kuch nahi" ka matlab kuch zaroor hai 😅\n- "5 minute" ka matlab 1 ghanta 💅\n- Shopping list kabhi khatam nahi hogi 🛍️\n\n*Love her anyway!* 💖`,

      `👰 *Rishta Fix!* 💐\n\nAaj se @${randomUser.id.split('@')[0]} tumhari *BIWI* hai! 👑\n\nShe is:\n🌹 Beautiful inside out\n🧠 Smarter than you (always)\n❤️ Your *QUEEN* forever!\n\n*Kabhi mat bhoolna - biwi hamesha sahi hoti hai!* 😂✅`
    ];

    const randomMsg = wifeMessages[Math.floor(Math.random() * wifeMessages.length)];

    await conn.sendMessage(
      mek.chat,
      {
        text: randomMsg,
        mentions: [randomUser.id]
      },
      { quoted: mek }
    );

  } catch (error) {
    console.error("Error in .wife command:", error);
    reply(`❌ Error: ${error.message}`);
  }
});

// ============================================
// 💌 PROPOSE COMMAND
// ============================================
cmd({
  pattern: "propose",
  alias: ["ishq", "pyaar", "ashiq"],
  desc: "Randomly proposes to someone in the group",
  react: "💌",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups!");

    const participants = groupMetadata.participants;
    const eligible = participants.filter(p => !p.id.includes(conn.user.id.split('@')[0]));

    if (eligible.length < 2) return reply("❌ Not enough people to propose! 😅");

    const shuffled = eligible.sort(() => 0.5 - Math.random());
    const proposer = shuffled[0];
    const proposed = shuffled[1];

    const proposeMessages = [
      `💌 *PROPOSAL ALERT!* 💌\n\n@${proposer.id.split('@')[0]} ne @${proposed.id.split('@')[0]} ko *PROPOSE* kar diya! 😍\n\nUsne kaha:\n*"Tum meri zindagi ho, meri duniya ho,\nTumhare bina mera WhatsApp bhi soona hai!"* 🥺❤️\n\nKya @${proposed.id.split('@')[0]} haan karegi/karega? 👀`,

      `💘 *Love is in the Air!* 💘\n\n@${proposer.id.split('@')[0]} dil tham ke baith gaya/gayi aur bola/boli:\n\n*"@${proposed.id.split('@')[0]}... Main tumse mohabbat karta/karti hoon!\nMeri life mein tum ho, toh kafi hai!\nKya tum mera haath thamoge?"* 🌹\n\nPuri group saans rok ke wait kar rahi hai! 😂`,

      `🌹 *Dil Ka Rishta!* 🌹\n\n@${proposer.id.split('@')[0]} ne ghutne tek diye aur kaha:\n\n*"@${proposed.id.split('@')[0]},\nTum Sprite ho meri zindagi mein - seedha saada pyaar!\nKya tum meri bano ge?"* 💍\n\n*Dono ko dil se CONGRATULATIONS!* 🎊❤️`
    ];

    const randomMsg = proposeMessages[Math.floor(Math.random() * proposeMessages.length)];

    await conn.sendMessage(
      mek.chat,
      {
        text: randomMsg,
        mentions: [proposer.id, proposed.id]
      },
      { quoted: mek }
    );

  } catch (error) {
    console.error("Error in .propose command:", error);
    reply(`❌ Error: ${error.message}`);
  }
});

// ============================================
// 😍 CRUSH COMMAND
// ============================================
cmd({
  pattern: "crush",
  alias: ["dil", "pasand", "heartbeat"],
  desc: "Reveals your secret crush in the group",
  react: "😍",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups!");

    const participants = groupMetadata.participants;
    const eligible = participants.filter(p => !p.id.includes(conn.user.id.split('@')[0]));

    if (eligible.length < 1) return reply("❌ No one to have a crush on! 😂");

    const randomUser = eligible[Math.floor(Math.random() * eligible.length)];
    
    // Sender info
    const senderMention = sender;

    const crushMessages = [
      `😍 *SECRET CRUSH REVEALED!* 😍\n\n@${senderMention.split('@')[0]} ka *SECRET CRUSH* hai:\n\n👉 @${randomUser.id.split('@')[0]} 👈\n\n🫀 Dil ki dhadkan: *100 se 1000 BPM*\n😳 Chehra: *Laal tamatar jesa*\n📱 Status: *Unke status baar baar dekhe*\n\n*Chhupa rahe the, ab pata chal gaya!* 😂🔥`,

      `💓 *Dil Ki Baat!* 💓\n\n@${senderMention.split('@')[0]} jab bhi @${randomUser.id.split('@')[0]} ka\nnaam dekhte/dekhti hain toh:\n\n❤️ Dil: *Dhak Dhak*\n😊 Chehra: *Smile aa jata hai*\n📱 Phone: *Baar baar check hota hai*\n🌙 Raat: *Neend nahi aati*\n\n*Yeh CRUSH hai ya kuch aur?* 😏💕`,

      `🥰 *Love Meter 100%!* 🥰\n\n*Scientific Research* bolta hai:\n@${senderMention.split('@')[0]} ka *CRUSH* hai\n@${randomUser.id.split('@')[0]} par! 💘\n\nProof:\n✅ Unke messages pehle padhte hain\n✅ Online dekh ke online aate hain\n✅ Unki DP save ki hui hai 📸\n\n*Ab bolo - *Sach hai ya nahi?* 😂🔥`
    ];

    const randomMsg = crushMessages[Math.floor(Math.random() * crushMessages.length)];

    await conn.sendMessage(
      mek.chat,
      {
        text: randomMsg,
        mentions: [senderMention, randomUser.id]
      },
      { quoted: mek }
    );

  } catch (error) {
    console.error("Error in .crush command:", error);
    reply(`❌ Error: ${error.message}`);
  }
});
