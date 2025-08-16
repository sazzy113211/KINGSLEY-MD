export const name = "ping";
export async function execute(sock, msg, args) {
    await sock.sendMessage(msg.key.remoteJid, { text: "🏓 Pong! Kingsley MD is alive." });
}