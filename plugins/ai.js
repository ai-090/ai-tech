import { fileURLToPath } from 'url';
import path from 'path';
import { cmd } from '../command.js';
import axios from 'axios';
import config from '../config.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Command 1: GPT-3.5 Turbo
cmd({ pattern: "gpt35", desc: "Ask GPT-3.5 Turbo AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.gpt35 Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *GPT-3.5 Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 2: GPT-4
cmd({ pattern: "gpt4", desc: "Ask GPT-4 AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.gpt4 Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *GPT-4 Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 3: GPT-4o
cmd({ pattern: "gpt4o", desc: "Ask GPT-4o AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.gpt4o Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *GPT-4o Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 4: Claude
cmd({ pattern: "claude", desc: "Ask Claude AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.claude Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *Claude Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 5: Claude Opus
cmd({ pattern: "claudeopus", desc: "Ask Claude Opus AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.claudeopus Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *Claude Opus Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 6: Gemini
cmd({ pattern: "gemini", desc: "Ask Gemini AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.gemini Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *Gemini Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 7: Gemini Pro
cmd({ pattern: "geminipro", desc: "Ask Gemini Pro AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.geminipro Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *Gemini Pro Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 8: Grok
cmd({ pattern: "grok", desc: "Ask Grok AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.grok Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *Grok Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 9: Grok Beta
cmd({ pattern: "grokbeta", desc: "Ask Grok Beta AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.grokbeta Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *Grok Beta Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 10: DeepSeek
cmd({ pattern: "deepseek", desc: "Ask DeepSeek AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.deepseek Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *DeepSeek Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 11: DeepSeek Coder
cmd({ pattern: "deepseekcoder", desc: "Ask DeepSeek Coder AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.deepseekcoder Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *DeepSeek Coder Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 12: LLaMA
cmd({ pattern: "llama", desc: "Ask LLaMA AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.llama Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *LLaMA Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 13: LLaMA 2
cmd({ pattern: "llama2", desc: "Ask LLaMA 2 AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.llama2 Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *LLaMA 2 Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 14: LLaMA 3
cmd({ pattern: "llama3", desc: "Ask LLaMA 3 AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.llama3 Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *LLaMA 3 Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 15: Perplexity
cmd({ pattern: "perplexity", desc: "Ask Perplexity AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.perplexity Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *Perplexity Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 16: Mistral
cmd({ pattern: "mistral", desc: "Ask Mistral AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.mistral Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *Mistral Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 17: CodeLLaMA
cmd({ pattern: "codellama", desc: "Ask CodeLLaMA AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.codellama Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *CodeLLaMA Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 18: Bard
cmd({ pattern: "bard", desc: "Ask Google Bard AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.bard Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *Bard Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 19: Copilot
cmd({ pattern: "copilot", desc: "Ask GitHub Copilot AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.copilot Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *Copilot Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 20: Copilot Pro
cmd({ pattern: "copilotpro", desc: "Ask GitHub Copilot Pro AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.copilotpro Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *Copilot Pro Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 21: ChatGPT
cmd({ pattern: "chatgpt", desc: "Ask ChatGPT AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.chatgpt Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *ChatGPT Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 22: ChatGPT Plus
cmd({ pattern: "chatgptplus", desc: "Ask ChatGPT Plus AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.chatgptplus Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *ChatGPT Plus Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 23: AI21
cmd({ pattern: "ai21", desc: "Ask AI21 Labs AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.ai21 Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *AI21 Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 24: Jurassic
cmd({ pattern: "jurassic", desc: "Ask Jurassic AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.jurassic Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *Jurassic Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 25: Command-R
cmd({ pattern: "commandr", desc: "Ask Command-R AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.commandr Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *Command-R Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 26: Command-R Plus
cmd({ pattern: "commandrplus", desc: "Ask Command-R Plus AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.commandrplus Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *Command-R Plus Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 27: Mixtral
cmd({ pattern: "mixtral", desc: "Ask Mixtral AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.mixtral Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *Mixtral Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 28: Phi
cmd({ pattern: "phi", desc: "Ask Phi AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.phi Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *Phi Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 29: Phi-2
cmd({ pattern: "phi2", desc: "Ask Phi-2 AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.phi2 Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *Phi-2 Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 30: Phi-3
cmd({ pattern: "phi3", desc: "Ask Phi-3 AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.phi3 Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *Phi-3 Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 31: Qwen
cmd({ pattern: "qwen", desc: "Ask Qwen AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.qwen Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *Qwen Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 32: Yi
cmd({ pattern: "yi", desc: "Ask Yi AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.yi Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *Yi Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 33: Yi-34B
cmd({ pattern: "yi34b", desc: "Ask Yi-34B AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.yi34b Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *Yi-34B Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 34: StarCoder
cmd({ pattern: "starcoder", desc: "Ask StarCoder AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.starcoder Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *StarCoder Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 35: Wizard
cmd({ pattern: "wizard", desc: "Ask Wizard AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.wizard Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *Wizard Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 36: Vicuna
cmd({ pattern: "vicuna", desc: "Ask Vicuna AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.vicuna Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *Vicuna Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 37: Alpaca
cmd({ pattern: "alpaca", desc: "Ask Alpaca AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.alpaca Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *Alpaca Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 38: Falcon
cmd({ pattern: "falcon", desc: "Ask Falcon AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.falcon Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *Falcon Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 39: BLOOM
cmd({ pattern: "bloom", desc: "Ask BLOOM AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.bloom Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *BLOOM Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 40: GPT-NeoX
cmd({ pattern: "gptneox", desc: "Ask GPT-NeoX AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.gptneox Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *GPT-NeoX Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 41: Dolly
cmd({ pattern: "dolly", desc: "Ask Dolly AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.dolly Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *Dolly Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 42: StableLM
cmd({ pattern: "stablelm", desc: "Ask StableLM AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.stablelm Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *StableLM Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 43: RedPajama
cmd({ pattern: "redpajama", desc: "Ask RedPajama AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.redpajama Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *RedPajama Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 44: OpenChat
cmd({ pattern: "openchat", desc: "Ask OpenChat AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.openchat Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *OpenChat Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 45: Neural-Chat
cmd({ pattern: "neuralchat", desc: "Ask Neural-Chat AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.neuralchat Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *Neural-Chat Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 46: Solar
cmd({ pattern: "solar", desc: "Ask Solar AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.solar Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *Solar Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 47: Orca
cmd({ pattern: "orca", desc: "Ask Orca AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.orca Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *Orca Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 48: Wizard-Coder
cmd({ pattern: "wizardcoder", desc: "Ask Wizard-Coder AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.wizardcoder Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *Wizard-Coder Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 49: CodeT5
cmd({ pattern: "codet5", desc: "Ask CodeT5 AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.codet5 Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *CodeT5 Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});

// Command 50: Starling
cmd({ pattern: "starling", desc: "Ask Starling AI.", category: "ai", react: "🤖", filename: __filename },
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("💬 *Usage:* `.starling Your question`");
        const apiUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        if (!data || !data.status) return reply("❌ API Error.");
        reply(`🤖 *Starling Says:*\n\n${data.result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error(error.message);
        reply("❌ Failed to connect to API.");
    }
});



cmd({
    pattern: "grammar",
    desc: "Check grammar and spelling in text.",
    category: "ai",
    react: "✍️",
    filename: __filename
},
async (conn, mek, m, { args, q, reply }) => {
    try {
        if (!q) {
            return reply(
                "💬 *Usage Example:*\n\n" +
                "`.grammar This is a sample text with some errors.`\n\n" +
                "Checks grammar and provides corrected version!"
            );
        }

        const apiUrl = `https://api.nexray.eu.cc/ai/grammarcheck?text=${encodeURIComponent(q)}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data || !data.status) {
            return reply("❌ Failed to check grammar. Please try again later.");
        }

        const result = data.result;
        if (!result) {
            return reply("⚠️ No grammar check result received.");
        }

        const { original, corrected, error_count } = result;
        
        let message = `✍️ *Grammar Check Results:*\n\n`;
        message += `*Original:* ${original}\n\n`;
        message += `*Corrected:* ${corrected}\n\n`;
        message += `*Errors Found:* ${error_count}\n\n`;
        message += `~ ${config.BOT_NAME}`;

        reply(message);
    } catch (error) {
        console.error("Grammar API Error:", error.message);
        reply("❌ Failed to connect to Grammar API. Please try again later.");
    }
});



cmd({
    pattern: "islamcity",
    desc: "Get Islamic information about a topic.",
    category: "ai",
    react: "🕌",
    filename: __filename
},
async (conn, mek, m, { args, q, reply }) => {
    try {
        if (!q) {
            return reply(
                "💬 *Usage Example:*\n\n" +
                "`.islam What is the significance of Jamarat?`\n\n" +
                "Get Islamic information and guidance!"
            );
        }

        const apiUrl = `https://api.nexray.eu.cc/ai/islamcity?text=${encodeURIComponent(q)}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data || !data.status) {
            return reply("❌ Failed to get Islamic information. Please try again later.");
        }

        let result = data.result || "⚠️ No information received.";
        reply(`🕌 *Islamic Information:*\n\n${result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error("Islamic API Error:", error.message);
        reply("❌ Failed to connect to Islamic API. Please try again later.");
    }
});



cmd({
    pattern: "kimi",
    desc: "Ask Kimi AI assistant.",
    category: "ai",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { args, q, reply }) => {
    try {
        if (!q) {
            return reply(
                "💬 *Usage Example:*\n\n" +
                "`.kimi Tell me about WordPress development.`\n\n" +
                "Ask anything and get Kimi AI response!"
            );
        }

        const apiUrl = `https://api.nexray.eu.cc/ai/kimi?text=${encodeURIComponent(q)}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data || !data.status) {
            return reply("❌ Failed to get a response from Kimi API. Please try again later.");
        }

        let result = data.result || "⚠️ No response received from Kimi.";
        reply(`🤖 *Kimi Says:*\n\n${result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error("Kimi API Error:", error.message);
        reply("❌ Failed to connect to Kimi API. Please try again later.");
    }
});



cmd({
    pattern: "lumin",
    desc: "Ask Lumin AI assistant.",
    category: "ai",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { args, q, reply }) => {
    try {
        if (!q) {
            return reply(
                "💬 *Usage Example:*\n\n" +
                "`.lumin Tell me something interesting.`\n\n" +
                "Ask anything and get Lumin AI response!"
            );
        }

        const apiUrl = `https://api.nexray.eu.cc/ai/lumin?text=${encodeURIComponent(q)}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data || !data.status) {
            return reply("❌ Failed to get a response from Lumin API. Please try again later.");
        }

        let result = data.result || "⚠️ No response received from Lumin.";
        reply(`🤖 *Lumin Says:*\n\n${result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error("Lumin API Error:", error.message);
        reply("❌ Failed to connect to Lumin API. Please try again later.");
    }
});



cmd({
    pattern: "mathgpt",
    desc: "Ask MathGPT for math help.",
    category: "ai",
    react: "🧮",
    filename: __filename
},
async (conn, mek, m, { args, q, reply }) => {
    try {
        if (!q) {
            return reply(
                "💬 *Usage Example:*\n\n" +
                "`.mathgpt Solve the equation 2x + 5 = 15`\n\n" +
                "Get help with math problems, concepts, and practice materials!"
            );
        }

        const apiUrl = `https://api.nexray.eu.cc/ai/mathgpt?text=${encodeURIComponent(q)}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data || !data.status) {
            return reply("❌ Failed to get a response from MathGPT API. Please try again later.");
        }

        let result = data.result || "⚠️ No response received from MathGPT.";
        reply(`🧮 *MathGPT Says:*\n\n${result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error("MathGPT API Error:", error.message);
        reply("❌ Failed to connect to MathGPT API. Please try again later.");
    }
});




cmd({
    pattern: "perplexity",
    desc: "Ask Perplexity AI.",
    category: "ai",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { args, q, reply }) => {
    try {
        if (!q) {
            return reply(
                "💬 *Usage Example:*\n\n" +
                "`.perplexity What is quantum computing?`\n\n" +
                "Ask anything and get Perplexity AI response!"
            );
        }

        const apiUrl = `https://api.nexray.eu.cc/ai/perplexity?text=${encodeURIComponent(q)}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data || !data.status) {
            return reply("❌ Failed to get a response from Perplexity API. Please try again later.");
        }

        let result = data.result || "⚠️ No response received from Perplexity.";
        reply(`🤖 *Perplexity Says:*\n\n${result}\n\n~ ${config.BOT_NAME}`);
    } catch (error) {
        console.error("Perplexity API Error:", error.message);
        reply("❌ Failed to connect to Perplexity API. Please try again later.");
    }
});

