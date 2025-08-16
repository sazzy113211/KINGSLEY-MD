import fs from "fs";
import { join } from "path";

const settingsPath = join(process.cwd(), "data", "settings.json");
function loadSettings() { return JSON.parse(fs.readFileSync(settingsPath)); }
function saveSettings(s) { fs.writeFileSync(settingsPath, JSON.stringify(s, null, 2)); }

export const name = "welcome";
export async function execute(sock, msg, args) {
    const settings = loadSettings();
    if (args[0] === "on") {
        settings.welcome = true;
        saveSettings(settings);
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Welcome messages ON." });
    } else if (args[0] === "off") {
        settings.welcome = false;
        saveSettings(settings);
        await sock.sendMessage(msg.key.remoteJid, { text: "❌ Welcome messages OFF." });
    } else {
        await sock.sendMessage(msg.key.remoteJid, { text: "Usage: !welcome on/off" });
    }
}