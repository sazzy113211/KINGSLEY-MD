export const name = "help";
export async function execute(sock, msg, args) {
    await sock.sendMessage(msg.key.remoteJid, {
        text: `
🤖 *Kingsley MD Bot*
Here are my commands:

!ping - Test if bot is alive
!echo <text> - Repeat your message
!help - Show this menu
        `
    });
}