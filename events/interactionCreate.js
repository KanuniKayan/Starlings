const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {

        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);
        console.log(`User '${interaction.user.globalName}' executed: '${interaction.commandName}' at ${new Date().toLocaleString()}`);

        if (!command) {
            await interaction.reply(`${interaction.commandName} not found`);
            return;
        }

        await command.execute(interaction);
    }
}