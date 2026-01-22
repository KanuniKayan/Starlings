// A slash command that allows you to set a prefix for your server

// Imports
const { SlashCommandBuilder, PermissionsBitField, MessageFlags, EmbedBuilder, ContainerBuilder} = require('discord.js');
const { setPrefix } = require("../../queries/db_index.js");

// Command
module.exports = {
    data: new SlashCommandBuilder()
        .setName('prefix')
        .setDescription('change prefix for commands')
        .addStringOption((option) => option
            .setName('prefix')
            .setDescription('set prefix')
            .setRequired(true)
            .setMaxLength(3)
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
        try {
            // Apply prefix
            const result = await setPrefix(server_id, prefix);
            if (result)
            {
                const container = new ContainerBuilder()
                    .setAccentColor(0x0234f8)
                    .addTextDisplayComponents(
                        (textDisplay) =>
                            textDisplay.setContent(
                                `### Prefix has been changed to ${prefix}\nUse /prefix to change this`,
                            ),
                    );

                await interaction.reply({components: [container], flags: MessageFlags.IsComponentsV2});
                console.log(`Prefix for server ${server_id} has been changed to '${prefix}'`);
            }
            else
            {
                await interaction.reply({content: `Something went wrong applying this prefix`, flags: MessageFlags.Ephemeral});
                console.log(`Could not change prefix for server ${server_id} with prefix '${prefix}'`);
            }
        } catch {
            console.log(`Something went wrong applying prefix '${prefix}' for server ${server_id}`);
        }
    }
}