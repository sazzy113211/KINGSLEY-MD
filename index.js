import makeWASocket, { useMultiFileAuthState, makeInMemoryStore, fetchLatestBaileysVersion } from "@whiskeysockets/baileys";
import pino from "pino";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// === Keepalive server for Coderspace ===
const app = express();
app.get("/", (req, res) => res.send("Kingsley MD Bot is running ✅"));
app.listen(3000, () => console.log("Keepalive server started on port 3000"));

// === Load commands dynamically ===
const commands = new Map();
const commandsPath = join(__dirname, "commands");
fs.readdirSync(commandsPath).forEach(file => {
    if (file.endsWith(".js")) {
        const command = await import(`./commands/${file}`);
        commands.set(command.name, command);
    }
});

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("session");
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: true,
        auth: state,
        version
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;

        const from = msg.key.remoteJid;
        const type = Object.keys(msg.message)[0];
        const body = type === "conversation" ? msg.message.conversation : msg.message.extendedTextMessage?.text;

        if (!body) return;

        if (body.startsWith("!")) {
            const args = body.slice(1).trim().split(/ +/);
            const cmdName = args.shift().toLowerCase();

            if (commands.has(cmdName)) {
                try {
                    await commands.get(cmdName).execute(sock, msg, args);
                } catch (e) {
                    await sock.sendMessage(from, { text: "❌ Error running command." });
                    console.error(e);
                }
            }
        }
    });
}

startBot();