const { Events, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');

// File is named buttonClickEvent for quicker understanding.
// Original event is called interactionCreate

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        try {

            // Pass checks
            if (!interaction.isButton()) return;

            // Call command
            await interaction.client.commands.get(interaction.customId).execute(interaction);
        }
        catch (error) {
            console.error(`Error occurred in buttonClickEvent.`, error);
        }
    }
}