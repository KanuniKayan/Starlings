// A slash command that allows you to restrict the bot to a specific or multiple channels

// Imports
const { SlashCommandBuilder, PermissionsBitField, MessageFlags, EmbedBuilder, ButtonStyle, ContainerBuilder } = require('discord.js');
const { getPrefix, getRestriction, setRestriction, removeRestriction } = require("../../queries/db_index.js");


// Command
module.exports = {
    data: new SlashCommandBuilder()
        .setName('restrict')
        .setDescription(`Add or remove this channel to the bot's channel restrictions`),
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

        const prefix = await getPrefix(interaction.guildId);

        try {
            // Check duplicates
            const get_result = await getRestriction(interaction.guildId);
            let set_result;
            let duplicate = false;
            get_result.forEach((channel) => {
                if (interaction.channelId === channel.channel_id) duplicate = true;
            });

            if (duplicate) {
                set_result = await removeRestriction(interaction.guildId, interaction.channelId);
            }
            else
            {
                set_result = await setRestriction(interaction.guildId, interaction.channelId);
            }


            if (set_result && duplicate)
            {
                const container = new ContainerBuilder()
                    .setAccentColor(0x0234f8)
                    .addTextDisplayComponents(
                        (textDisplay) =>
                            textDisplay.setContent(
                                '### Starlings removed from this channel.\nUse /restrict to enable this.',
                            )
                    );

                await interaction.reply({components: [container], flags: MessageFlags.IsComponentsV2});
                console.log(`Removed channel restriction for server '${interaction.guildId}' with channelId '${interaction.channelId}'`);
            }
            else
            {
                const container = new ContainerBuilder()
                    .setAccentColor(0x0234f8)
                    .addTextDisplayComponents(
                        (textDisplay) =>
                            textDisplay.setContent(
                                `### You can now use Starlings in this channel!\nType '${prefix}help' for more information`,
                            ),
                    );

                await interaction.reply({components: [container], flags: MessageFlags.IsComponentsV2});
                console.log(`Added channel restriction for server '${interaction.guildId}' with channelId '${interaction.channelId}'`);
            }
        } catch {
            console.log(`Something went wrong adding restriction for server '${interaction.guildId}' with channelId '${interaction.channelId}'`);
        }
    }
}