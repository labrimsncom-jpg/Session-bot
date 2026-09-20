const { Events } = require("discord.js");
const { GUILD_ID } = require("../config");

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`✅ Connecté en tant que ${client.user.tag}`);

    const commands = client.commands.map((command) => command.data.toJSON());

    if (GUILD_ID) {
      const guild = await client.guilds.fetch(GUILD_ID);
      await guild.commands.set(commands);
    } else {
      await client.application.commands.set(commands);
    }

    console.log(`📦 ${commands.length} commande(s) enregistrée(s)`);
  },
};
