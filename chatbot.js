import fetch from "node-fetch";

export const name = "chat";
export async function execute(sock, msg, args) {
    const text = args.join(" ");
    if (!text) {
        await sock.sendMessage(msg.key.remoteJid, { text: "💡 Usage: !chat <message>" });
        return;
    }
    const res = await fetch(`https://api.simsimi.net/v2/?text=${encodeURIComponent(text)}&lc=en`);
    const data = await res.json();
    await sock.sendMessage(msg.key.remoteJid, { text: data.success || "🤖 I don’t know what to say." });
}