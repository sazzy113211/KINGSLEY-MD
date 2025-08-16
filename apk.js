import fetch from "node-fetch";

export const name = "apk";
export async function execute(sock, msg, args) {
    const query = args.join(" ");
    if (!query) return sock.sendMessage(msg.key.remoteJid, { text: "💡 Usage: !apk <app name>" });

    const url = `https://api.popcat.xyz/playstore?q=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();

    await sock.sendMessage(msg.key.remoteJid, {
        text: `📱 *${data.title}*\n👨‍💻 Developer: ${data.developer}\n⭐ Rating: ${data.ratings}\n🔗 ${data.url}`
    });
}