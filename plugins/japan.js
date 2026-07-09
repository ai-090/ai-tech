import { fileURLToPath } from 'url';
import axios from 'axios';
import config from '../config.js';
import { cmd } from '../command.js';

const __filename = fileURLToPath(import.meta.url);

// ============================================================
// HELPER FUNCTION: Dual API with fallback
// ============================================================
async function sendRandomImage(conn, from, m, primaryApi, fallbackApi, caption, reply) {
    const apis = [primaryApi, fallbackApi].filter(Boolean);
    
    for (const apiUrl of apis) {
        try {
            const res = await axios.get(apiUrl, {
                responseType: 'arraybuffer',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Accept': '*/*'
                },
                timeout: 15000
            });
            
            if (res.data && res.data.length > 100) {
                const buffer = Buffer.from(res.data);
                const contentType = res.headers['content-type'] || 'image/jpeg';
                const mimeType = contentType.includes('png') ? 'image/png' : 
                                contentType.includes('webp') ? 'image/webp' : 'image/jpeg';
                
                await conn.sendMessage(from, {
                    image: buffer,
                    mimetype: mimeType,
                    caption: caption
                }, { quoted: m });
                return true; // Success
            }
        } catch (err) {
            console.log(`API failed: ${apiUrl} - ${err.message}`);
            continue; // Try next API
        }
    }
    
    reply("⚠️ All APIs failed! Try again later.");
    return false;
}

// ============================================================
// OLD APIs (api.nexray.eu.cc) - KEPT AS IS
// ============================================================

// China Command
cmd({
    pattern: "china",
    alias: ["chinagirl", "cngirl"],
    react: "🇨🇳",
    desc: "Get random China girl images",
    category: "hot",
    use: ".china",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const imageUrl = `https://api.nexray.eu.cc/random/cecan/china`;
        const caption = `> ${config.BOT_NAME}`;
        
        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: caption
        }, { quoted: m });

    } catch (error) {
        console.error('China Image Error:', error);
        reply(`⚠️ A problem has occurred.\n\n${error.message}`);
    }
});

// Indonesia Command
cmd({
    pattern: "indo",
    alias: ["indonesia", "indogirl"],
    react: "🇮🇩",
    desc: "Get random Indonesia girl images",
    category: "hot",
    use: ".indo",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const imageUrl = `https://api.nexray.eu.cc/random/cecan/indonesia`;
        const caption = `> ${config.BOT_NAME}`;
        
        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: caption
        }, { quoted: m });

    } catch (error) {
        console.error('Indonesia Image Error:', error);
        reply(`⚠️ A problem has occurred.\n\n${error.message}`);
    }
});

// Korea Command
cmd({
    pattern: "korea",
    alias: ["koreagirl", "krgirl"],
    react: "🇰🇷",
    desc: "Get random Korea girl images",
    category: "hot",
    use: ".korea",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const imageUrl = `https://api.nexray.eu.cc/random/cecan/korea`;
        const caption = `> ${config.BOT_NAME}`;
        
        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: caption
        }, { quoted: m });

    } catch (error) {
        console.error('Korea Image Error:', error);
        reply(`⚠️ A problem has occurred.\n\n${error.message}`);
    }
});

// Thailand Command
cmd({
    pattern: "thailand",
    alias: ["thai", "thaigirl"],
    react: "🇹🇭",
    desc: "Get random Thailand girl images",
    category: "hot",
    use: ".thailand",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const imageUrl = `https://api.nexray.eu.cc/random/cecan/thailand`;
        const caption = `> ${config.BOT_NAME}`;
        
        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: caption
        }, { quoted: m });

    } catch (error) {
        console.error('Thailand Image Error:', error);
        reply(`⚠️ A problem has occurred.\n\n${error.message}`);
    }
});

// Vietnam Command
cmd({
    pattern: "vietnam",
    alias: ["viet", "vietnamgirl"],
    react: "🇻🇳",
    desc: "Get random Vietnam girl images",
    category: "hot",
    use: ".vietnam",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const imageUrl = `https://api.nexray.eu.cc/random/cecan/vietnam`;
        const caption = `> ${config.BOT_NAME}`;
        
        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: caption
        }, { quoted: m });

    } catch (error) {
        console.error('Vietnam Image Error:', error);
        reply(`⚠️ A problem has occurred.\n\n${error.message}`);
    }
});

// Loli Command
cmd({
    pattern: "loli",
    alias: ["loliimg"],
    react: "👧",
    desc: "Get random loli images",
    category: "hot",
    use: ".loli",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const imageUrl = `https://api.nexray.eu.cc/random/loli`;
        const caption = `> ${config.BOT_NAME}`;
        
        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: caption
        }, { quoted: m });

    } catch (error) {
        console.error('Loli Image Error:', error);
        reply(`⚠️ A problem has occurred.\n\n${error.message}`);
    }
});

// Pap Command
cmd({
    pattern: "pap",
    alias: ["papimg"],
    react: "📸",
    desc: "Get random pap images",
    category: "hot",
    use: ".pap",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const imageUrl = `https://api.nexray.eu.cc/random/pap`;
        const caption = `> ${config.BOT_NAME}`;
        
        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: caption
        }, { quoted: m });

    } catch (error) {
        console.error('Pap Image Error:', error);
        reply(`⚠️ A problem has occurred.\n\n${error.message}`);
    }
});

// Japan Command
cmd({
    pattern: "japan",
    alias: ["japangirl", "jpgirl"],
    react: "🇯🇵",
    desc: "Get random Japan girl images",
    category: "hot",
    use: ".japan",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const imageUrl = `https://api.nexray.eu.cc/random/cecan/japan`;
        const caption = `> ${config.BOT_NAME}`;
        
        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: caption
        }, { quoted: m });

    } catch (error) {
        console.error('Japan Image Error:', error);
        reply(`⚠️ A problem has occurred.\n\n${error.message}`);
    }
});

// ============================================================
// NEW APIs (apis.prexzyvilla.site) - WITH DUAL API FALLBACK
// ============================================================

// NSFW Anime Command
cmd({
    pattern: "anhsfw",
    alias: ["nsfwanime", "animensfw"],
    react: "🔞",
    desc: "Get random NSFW anime images",
    category: "hot",
    use: ".anhsfw",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const primary = 'https://apis.prexzyvilla.site/random/anhsfw';
        const fallback = 'https://api.nexray.eu.cc/random/nsfw'; // fallback if exists
        const caption = `> ${config.BOT_NAME}`;
        
        await sendRandomImage(conn, from, m, primary, null, caption, reply);
    } catch (error) {
        console.error('Anhsfw Error:', error);
        reply(`⚠️ A problem has occurred.`);
    }
});

// Anime Moe Command
cmd({
    pattern: "anhmoe",
    alias: ["animemoe", "moe"],
    react: "🌸",
    desc: "Get random anime moe images",
    category: "hot",
    use: ".anhmoe",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const primary = 'https://apis.prexzyvilla.site/random/anhmoe';
        const caption = `> ${config.BOT_NAME}`;
        
        await sendRandomImage(conn, from, m, primary, null, caption, reply);
    } catch (error) {
        console.error('Anhmoe Error:', error);
        reply(`⚠️ A problem has occurred.`);
    }
});

// Blue Archive Command
cmd({
    pattern: "bluearchive",
    alias: ["ba", "bluearch"],
    react: "🎮",
    desc: "Get random Blue Archive images",
    category: "hot",
    use: ".bluearchive",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const primary = 'https://apis.prexzyvilla.site/random/bluearchive';
        const caption = `> ${config.BOT_NAME}`;
        
        await sendRandomImage(conn, from, m, primary, null, caption, reply);
    } catch (error) {
        console.error('Bluearchive Error:', error);
        reply(`⚠️ A problem has occurred.`);
    }
});

// Boy Pic Command
cmd({
    pattern: "boypic",
    alias: ["boy", "boyimg"],
    react: "👦",
    desc: "Get random boy images",
    category: "hot",
    use: ".boypic",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const primary = 'https://apis.prexzyvilla.site/random/boypic';
        const caption = `> ${config.BOT_NAME}`;
        
        await sendRandomImage(conn, from, m, primary, null, caption, reply);
    } catch (error) {
        console.error('Boypic Error:', error);
        reply(`⚠️ A problem has occurred.`);
    }
});

// Car Command
cmd({
    pattern: "car",
    alias: ["carimg", "supercar"],
    react: "🚗",
    desc: "Get random car images",
    category: "hot",
    use: ".car",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const primary = 'https://apis.prexzyvilla.site/random/car';
        const caption = `> ${config.BOT_NAME}`;
        
        await sendRandomImage(conn, from, m, primary, null, caption, reply);
    } catch (error) {
        console.error('Car Error:', error);
        reply(`⚠️ A problem has occurred.`);
    }
});

// Cat Command
cmd({
    pattern: "cat",
    alias: ["catimg", "kitty"],
    react: "🐱",
    desc: "Get random cat images",
    category: "hot",
    use: ".cat",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const primary = 'https://apis.prexzyvilla.site/random/cat';
        const caption = `> ${config.BOT_NAME}`;
        
        await sendRandomImage(conn, from, m, primary, null, caption, reply);
    } catch (error) {
        console.error('Cat Error:', error);
        reply(`⚠️ A problem has occurred.`);
    }
});

// China Girl (New API) Command
cmd({
    pattern: "china2",
    alias: ["cngirl2", "china2"],
    react: "🇨🇳",
    desc: "Get random China girl images (Prexzy API)",
    category: "hot",
    use: ".chinagirl2",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const primary = 'https://apis.prexzyvilla.site/random/chinagirl';
        const fallback = 'https://api.nexray.eu.cc/random/cecan/china';
        const caption = `> ${config.BOT_NAME}`;
        
        await sendRandomImage(conn, from, m, primary, fallback, caption, reply);
    } catch (error) {
        console.error('Chinagirl2 Error:', error);
        reply(`⚠️ A problem has occurred.`);
    }
});

// Dog Command
cmd({
    pattern: "dog",
    alias: ["dogimg", "puppy"],
    react: "🐶",
    desc: "Get random dog images",
    category: "hot",
    use: ".dog",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const primary = 'https://apis.prexzyvilla.site/random/dog';
        const caption = `> ${config.BOT_NAME}`;
        
        await sendRandomImage(conn, from, m, primary, null, caption, reply);
    } catch (error) {
        console.error('Dog Error:', error);
        reply(`⚠️ A problem has occurred.`);
    }
});

// Random Girl Command
cmd({
    pattern: "randomgirl",
    alias: ["rgirl", "randgirl"],
    react: "👩",
    desc: "Get random girl images",
    category: "hot",
    use: ".randomgirl",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const primary = 'https://apis.prexzyvilla.site/random/randomgirl';
        const caption = `> ${config.BOT_NAME}`;
        
        await sendRandomImage(conn, from, m, primary, null, caption, reply);
    } catch (error) {
        console.error('Randomgirl Error:', error);
        reply(`⚠️ A problem has occurred.`);
    }
});

// Hijab Girl Command
cmd({
    pattern: "hijabgirl",
    alias: ["hijab", "hijabimg"],
    react: "🧕",
    desc: "Get random hijab girl images",
    category: "hot",
    use: ".hijabgirl",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const primary = 'https://apis.prexzyvilla.site/random/hijabgirl';
        const caption = `> ${config.BOT_NAME}`;
        
        await sendRandomImage(conn, from, m, primary, null, caption, reply);
    } catch (error) {
        console.error('Hijabgirl Error:', error);
        reply(`⚠️ A problem has occurred.`);
    }
});

// Indonesia Girl (New API) Command
cmd({
    pattern: "indonesia2",
    alias: ["indogirl2", "indo2"],
    react: "🇮🇩",
    desc: "Get random Indonesia girl images (Prexzy API)",
    category: "hot",
    use: ".indonesiagirl",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const primary = 'https://apis.prexzyvilla.site/random/indonesiagirl';
        const fallback = 'https://api.nexray.eu.cc/random/cecan/indonesia';
        const caption = `> ${config.BOT_NAME}`;
        
        await sendRandomImage(conn, from, m, primary, fallback, caption, reply);
    } catch (error) {
        console.error('Indonesiagirl Error:', error);
        reply(`⚠️ A problem has occurred.`);
    }
});

// Japan Girl (New API) Command
cmd({
    pattern: "japan2",
    alias: ["jpgirl2", "japan2"],
    react: "🇯🇵",
    desc: "Get random Japan girl images (Prexzy API)",
    category: "hot",
    use: ".japangirl2",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const primary = 'https://apis.prexzyvilla.site/random/japangirl';
        const fallback = 'https://api.nexray.eu.cc/random/cecan/japan';
        const caption = `> ${config.BOT_NAME}`;
        
        await sendRandomImage(conn, from, m, primary, fallback, caption, reply);
    } catch (error) {
        console.error('Japangirl2 Error:', error);
        reply(`⚠️ A problem has occurred.`);
    }
});

// Korean Girl Command
cmd({
    pattern: "korean2",
    alias: ["krgirl2", "korea2"],
    react: "🇰🇷",
    desc: "Get random Korean girl images (Prexzy API)",
    category: "hot",
    use: ".koreangirl",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const primary = 'https://apis.prexzyvilla.site/random/koreangirl';
        const fallback = 'https://api.nexray.eu.cc/random/cecan/korea';
        const caption = `> ${config.BOT_NAME}`;
        
        await sendRandomImage(conn, from, m, primary, fallback, caption, reply);
    } catch (error) {
        console.error('Koreangirl Error:', error);
        reply(`⚠️ A problem has occurred.`);
    }
});

// Malaysia Girl Command
cmd({
    pattern: "malaysia",
    alias: ["malaygirl", "malaysia"],
    react: "🇲🇾",
    desc: "Get random Malaysia girl images",
    category: "hot",
    use: ".malaysiagirl",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const primary = 'https://apis.prexzyvilla.site/random/malaysiagirl';
        const caption = `> ${config.BOT_NAME}`;
        
        await sendRandomImage(conn, from, m, primary, null, caption, reply);
    } catch (error) {
        console.error('Malaysiagirl Error:', error);
        reply(`⚠️ A problem has occurred.`);
    }
});

// Profile Pics Command
cmd({
    pattern: "profilepics",
    alias: ["pfp", "profilepic"],
    react: "🖼️",
    desc: "Get random profile pictures",
    category: "hot",
    use: ".profilepics",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const primary = 'https://apis.prexzyvilla.site/random/profilepics';
        const caption = `> ${config.BOT_NAME}`;
        
        await sendRandomImage(conn, from, m, primary, null, caption, reply);
    } catch (error) {
        console.error('Profilepics Error:', error);
        reply(`⚠️ A problem has occurred.`);
    }
});

// Thailand Girl (New API) Command
cmd({
    pattern: "thailand",
    alias: ["thaigirl2", "thai2"],
    react: "🇹🇭",
    desc: "Get random Thailand girl images (Prexzy API)",
    category: "hot",
    use: ".thailandgirl2",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const primary = 'https://apis.prexzyvilla.site/random/thailandgirl';
        const fallback = 'https://api.nexray.eu.cc/random/cecan/thailand';
        const caption = `> ${config.BOT_NAME}`;
        
        await sendRandomImage(conn, from, m, primary, fallback, caption, reply);
    } catch (error) {
        console.error('Thailandgirl2 Error:', error);
        reply(`⚠️ A problem has occurred.`);
    }
});

// Vietnam Girl (New API) Command
cmd({
    pattern: "vietnam2",
    alias: ["vietgirl2", "viet2"],
    react: "🇻🇳",
    desc: "Get random Vietnam girl images (Prexzy API)",
    category: "hot",
    use: ".vietnamgirl2",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const primary = 'https://apis.prexzyvilla.site/random/vietnamgirl';
        const fallback = 'https://api.nexray.eu.cc/random/cecan/vietnam';
        const caption = `> ${config.BOT_NAME}`;
        
        await sendRandomImage(conn, from, m, primary, fallback, caption, reply);
    } catch (error) {
        console.error('Vietnamgirl2 Error:', error);
        reply(`⚠️ A problem has occurred.`);
    }
});