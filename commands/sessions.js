const { SlashCommandBuilder, MessageFlags } = require("discord.js");
const { ROLE_PING_ID, ROLE_AUTORISE_ID, CODE_SESSION } = require("../config");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sessions")
    .setDescription("Annonce qu'une session RP est en cours")
    .addStringOption((option) =>
      option
        .setName("code")
        .setDescription("Code de la session (optionnel)")
        .setRequired(false)
    ),

  async execute(interaction) {
    if (!interaction.inGuild()) {
      return interaction.reply({
        content: "❌ Cette commande fonctionne uniquement dans un serveur.",
        flags: MessageFlags.Ephemeral,
      });
    }

    // Vérification du rôle
    if (!interaction.member.roles.cache.has(ROLE_AUTORISE_ID)) {
      return interaction.reply({
        content: "❌ Tu n'as pas le rôle nécessaire pour utiliser cette commande.",
        flags: MessageFlags.Ephemeral,
      });
    }

    const code = interaction.options.getString("code") ?? CODE_SESSION;

    const message = [
      `|| <@&${ROLE_PING_ID}> ||`,
      "",
      "📢・**SESSION EN COURS — HOLY**",
      "",
      "🎮 La session RP est actuellement ouverte !",
      "",
      "🚨 Rejoignez-nous dès maintenant et préparez-vous pour une bonne session.",
      "",
      "📍 Rendez-vous directement en jeu.",
      "",
      "🔥 On vous attend nombreux !",
      "",
      `📌 ${code}`,
      "",
      "— L'équipe HOLY",
    ].join("\n");

    await interaction.reply({
      content: message,
      allowedMentions: { roles: [ROLE_PING_ID] },
    });
  },
};
