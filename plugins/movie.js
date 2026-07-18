import { cmd } from '../command.js';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// Single API Base URL
const API_BASE_URL = 'https://lai-psi.vercel.app/api';

// Status emoji function
function getCountStatus(count) {
    if (count === 50) return '🔴';
    if (count >= 40) return '🟣';
    if (count >= 30) return '🟡';
    if (count >= 20) return '🟠';
    if (count >= 10) return '🔵';
    return '🟢';
}

// ==================== STATUS COMMAND ====================

cmd(
    {
        pattern: 'funxy',
        alias: ['serverstatus', 'stats', 'servers'],
        react: '📊',
        desc: 'Check server status and active users',
        category: '💬 Fun Text',
        use: '.status',
        filename: __filename
    },
    async (conn, mek, m, { reply }) => {
        try {
            await reply('📡 Checking server status...');

            const serversResponse = await axios.get(`${API_BASE_URL}/servers`, {
                timeout: 5000
            });

            if (!serversResponse.data || !serversResponse.data.servers) {
                return reply('❌ Failed to fetch server list.');
            }

            const servers = serversResponse.data.servers;
            const serverStatus = [];
            let totalActive = 0;
            let totalLimit = 0;
            let onlineServers = 0;
            let offlineServers = 0;

            for (let i = 0; i < servers.length; i++) {
                const server = servers[i];

                try {
                    const statusResponse = await axios.get(`${API_BASE_URL}/status/${server.id}`, {
                        timeout: 5000
                    });

                    if (statusResponse.data && !statusResponse.data.error) {
                        const count = statusResponse.data.count || 0;
                        const limit = statusResponse.data.limit || 50;
                        const statusEmoji = getCountStatus(count);

                        serverStatus.push({
                            server: server.id,
                            name: server.name,
                            count,
                            limit,
                            status: `${statusEmoji} ONLINE`
                        });

                        totalActive += count;
                        totalLimit += limit;
                        onlineServers++;
                    } else {
                        serverStatus.push({
                            server: server.id,
                            name: server.name,
                            count: 0,
                            limit: 50,
                            status: '🟡 NO DATA'
                        });
                        offlineServers++;
                    }
                } catch (_) {
                    serverStatus.push({
                        server: server.id,
                        name: server.name,
                        count: 0,
                        limit: 50,
                        status: '🔴 OFFLINE'
                    });
                    offlineServers++;
                }
            }

            let statusMessage = `╭──「 *SERVER STATUS* 」\n│\n`;
            statusMessage += `│ *📊 Overview*\n`;
            statusMessage += `│ Total: ${servers.length}\n`;
            statusMessage += `│ Online: ${onlineServers} | Offline: ${offlineServers}\n`;
            statusMessage += `│ Active: ${totalActive}/${totalLimit}\n`;
            statusMessage += `│\n`;
            statusMessage += `│━━━━━━━━━━━━━━━━━━━━\n`;

            serverStatus.forEach((s) => {
                const statusIcon = s.status.split(' ')[0];
                const statusText = s.status.split(' ')[1];
                statusMessage += `│ ${s.name.padEnd(8)}: ${String(s.count).padStart(2)}/${s.limit} ${statusIcon} ${statusText}\n`;
            });

            statusMessage += `╰─────────────────`;

            await reply(statusMessage);
        } catch (error) {
            console.error('Status command error:', error);
            await reply('❌ Error checking server status. Make sure your API is running.');
        }
    }
);

// ==================== PAIR COMMAND ====================

cmd(
    {
        pattern: 'pair',
        alias: ['getpair', 'clonebot'],
        react: '✅',
        desc: 'Get pairing code for erfan-MD bot',
        category: 'owner',
        use: '.pair 923306137477',
        filename: __filename
    },
    async (conn, mek, m, { q, senderNumber, reply }) => {
        try {
            const phoneNumber = q
                ? q.trim().replace(/[^0-9]/g, '')
                : senderNumber.replace(/[^0-9]/g, '');

            if (!phoneNumber || phoneNumber.length < 10 || phoneNumber.length > 15) {
                return await reply('❌ Please provide a valid phone number without +\nExample: .pair 923306137477');
            }

            const randomResponse = await axios.get(`${API_BASE_URL}/random`, {
                timeout: 5000
            });

            if (!randomResponse.data || !randomResponse.data.server) {
                return await reply('❌ Failed to get available server. Please try again.');
            }

            const selectedServer = randomResponse.data.server;

            const response = await axios.get(`${API_BASE_URL}/code`, {
                params: {
                    server: selectedServer,
                    number: phoneNumber
                },
                timeout: 20000
            });

            if (!response.data || !response.data.code) {
                return await reply('❌ Failed to retrieve pairing code. Please try again later.');
            }

            const pairingCode = response.data.code;

            await reply(
                `🔐 *ERFAN-MD PAIR CODE*\n\n` +
                `${pairingCode}\n\n` +
                `Server: ${selectedServer}\n\n` +
                `📱 *How to use:*\n` +
                `1. Open WhatsApp on your phone\n` +
                `2. Go to Linked Devices\n` +
                `3. Tap on Link Device\n` +
                `4. Enter this code when prompted`
            );

            await new Promise((resolve) => setTimeout(resolve, 2000));
            await reply(pairingCode);
        } catch (error) {
            console.error('Pair command error:', error);
            await reply('❌ An error occurred while getting pairing code. Please try again later.');
        }
    }
);

// ==================== UNFOLLOW CHANNEL (ALL SERVERS) ====================
// Open to everyone now — no number restriction. Still protected by
// ADMIN_API_KEY at the route level (see index.js /unfollow-newsletter),
// so it only works if that key is set correctly.

cmd(
    {
        pattern: 'unfollowall',
        alias: ['uc', 'channelunfollow'],
        react: '📤',
        desc: 'Unfollow a channel across every server',
        category: 'misc',
        use: '.unfollowall <channel link or JID>',
        filename: __filename
    },
    async (conn, mek, m, { q, senderNumber, reply }) => {
        try {
            if (!process.env.ADMIN_API_KEY) {
                return await reply('❌ ADMIN_API_KEY is not set on this server — set it in your Heroku config vars first.');
            }

            if (!q || !q.trim()) {
                return await reply('❓ Please give a channel link or JID.\nExample: .unfollowall https://whatsapp.com/channel/xxxxxxxx');
            }

            const input = q.trim();
            let channelJid = null;

            // Resolve an invite link/code into the actual channel JID.
            // A raw JID (...@newsletter) is used as-is.
            if (input.endsWith('@newsletter')) {
                channelJid = input;
            } else {
                const inviteCode = input.includes('whatsapp.com/channel/')
                    ? input.split('whatsapp.com/channel/')[1].split(/[/?]/)[0]
                    : input;
                try {
                    const meta = await conn.newsletterMetadata('invite', inviteCode);
                    channelJid = meta?.id;
                } catch (e) {
                    return await reply(`❌ Couldn't resolve that channel link/code: ${e.message}`);
                }
            }

            if (!channelJid) {
                return await reply('❌ Could not determine the channel JID from what you gave me.');
            }

            await reply(`📡 Fetching server list and unfollowing across all servers...\nChannel: ${channelJid}`);

            const serversResponse = await axios.get(`${API_BASE_URL}/servers`, { timeout: 5000 });
            if (!serversResponse.data || !serversResponse.data.servers) {
                return await reply('❌ Failed to fetch server list.');
            }
            const servers = serversResponse.data.servers;

            let totalUnfollowed = 0;
            let totalSessions = 0;
            const perServer = [];

            for (const server of servers) {
                try {
                    const res = await axios.get(`${API_BASE_URL}/unfollow-newsletter`, {
                        params: { server: server.id, channel: channelJid, key: process.env.ADMIN_API_KEY },
                        timeout: 15000
                    });
                    const data = res.data || {};
                    totalUnfollowed += data.unfollowed || 0;
                    totalSessions += data.totalSessions || 0;
                    perServer.push(`${server.name}: ${data.unfollowed || 0}/${data.totalSessions || 0} unfollowed`);
                } catch (e) {
                    perServer.push(`${server.name}: ❌ failed (${e.response?.status || e.message})`);
                }
            }

            let resultMsg = `✅ *Unfollow complete*\n\nChannel: ${channelJid}\nTotal unfollowed: ${totalUnfollowed}/${totalSessions}\n\n`;
            resultMsg += perServer.map((s) => `• ${s}`).join('\n');
            await reply(resultMsg);
        } catch (error) {
            console.error('Unfollowall command error:', error);
            await reply('❌ Error running unfollowall: ' + error.message);
        }
    }
);
