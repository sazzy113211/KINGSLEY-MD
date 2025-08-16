export const name = "echo";
export async function execute(sock, msg, args) {
    const text = args.join(" ");
    await sock.sendMessage(msg.key.remoteJid, { text: text || "⚠️ You didn’t type anything." });
}