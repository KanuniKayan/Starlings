// A slash command that allows you to set a prefix for your server

// Imports
const { SlashCommandBuilder, PermissionsBitField, MessageFlags } = require('discord.js');
const { setPrefix } = require("../../queries/db_index.js")
const fs = require('node:fs');
const path = require('node:path');

// Command
module.exports = {
    data: new SlashCommandBuilder()
        .setName('prefix')
        .setDescription('change prefix for commands')
        .addStringOption((option) => option
            .setName('prefix')
            .setDescription('Change prefix for commands')
            .setRequired(true)
        ),
    async execute(interaction) {

        // Allow only administrators of servers to use this command
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.MANAGE_MESSAGES))
        {
            interaction.reply({
                content: `Missing permissions`,
                flags: MessageFlags.Ephemeral,
            });
            return;
        }

        // Collect id and prefix
        const server_id = interaction.guildId;
        const prefix = interaction.options.getString('prefix');
        if (prefix.length < 1 || prefix.length > 3)
        {
            interaction.reply({content: `Prefix must be between 1 and 3 characters.`, flags: MessageFlags.Ephemeral});
            return;
        }

        try {
            // Apply prefix
            const result = await setPrefix(server_id, prefix);
            if (result)
            {
                await interaction.reply(`Prefix has been changed to **${prefix}**`);
                console.log(`Prefix for server ${interaction.guildId} has been changed to '${prefix}'`);
            }
            else
            {
                await interaction.reply({content: `Something went wrong applying this prefix`, flags: MessageFlags.Ephemeral});
                console.log(`Could not change prefix for server ${interaction.guildId} with prefix '${prefix}'`);
            }
        } catch {
            console.log(`Something went wrong applying prefix '${prefix}' for server ${interaction.guildId}`);
        }
    }
}