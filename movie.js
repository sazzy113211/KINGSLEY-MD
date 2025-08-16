import fetch from "node-fetch";

export const name = "movie";
export async function execute(sock, msg, args) {
    const title = args.join(" ");
    if (!title) return sock.sendMessage(msg.key.remoteJid, { text: "💡 Usage: !movie <title>" });

    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=4a3b711b`; // Free OMDB API
    const res = await fetch(url);
    const data = await res.json();

    if (data.Response === "False") {
        await sock.sendMessage(msg.key.remoteJid, { text: "❌ Movie not found." });
    } else {
        await sock.sendMessage(msg.key.remoteJid, { text: `🎬 *${data.Title}* (${data.Year})\n⭐ Rating: ${data.imdbRating}\n📖 Plot: ${data.Plot}` });
    }
}