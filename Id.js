export const name = "id";
export async function execute(sock, msg, args) {
    const from = msg.key.remoteJid;
    const user = msg.key.participant || msg.key.remoteJid;
    await sock.sendMessage(from, { text: `👤 Your ID: ${user}\n📌 Chat ID: ${from}` });
}