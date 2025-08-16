export const name = "tagall";
export async function execute(sock, msg, args) {
    const groupMetadata = await sock.groupMetadata(msg.key.remoteJid);
    const participants = groupMetadata.participants.map(p => p.id);
    const mentions = participants;

    let text = "📢 *Tagging All Members:*\n\n";
    participants.forEach(p => text += `@${p.split("@")[0]} \n`);

    await sock.sendMessage(msg.key.remoteJid, { text, mentions });
}