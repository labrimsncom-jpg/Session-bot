const { Events } = require("discord.js");
const { GUILD_ID } = require("../config");

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`✅ Connecté en tant que ${client.user.tag}`);

    const globales = client.commands.filter((c) => c.global).map((c) => c.data.toJSON());
    const locales = client.commands.filter((c) => !c.global).map((c) => c.data.toJSON());

    await client.application.commands.set(globales);

    if (GUILD_ID) {
      const guild = await client.guilds.fetch(GUILD_ID);
      await guild.commands.set(locales);
    }

    console.log(`📦 ${globales.length} commande(s) globale(s), ${locales.length} commande(s) locale(s)`);
  },
};
