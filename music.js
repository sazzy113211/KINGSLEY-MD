import fetch from "node-fetch";

export const name = "music";
export async function execute(sock, msg, args) {
    const query = args.join(" ");
    if (!query) return sock.sendMessage(msg.key.remoteJid, { text: "💡 Usage: !music <song name>" });

    const url = `https://api.popcat.xyz/spotify?track=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();

    await sock.sendMessage(msg.key.remoteJid, { text: `🎶 *${data.name}* by ${data.artist}\n🔗 ${data.url}` });
}