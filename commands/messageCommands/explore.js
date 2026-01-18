// Exploration command

const {EmbedBuilder, ContainerBuilder, MessageFlags, ActionRowBuilder, ButtonBuilder, ButtonStyle,
    SeparatorBuilder,
    SeparatorSpacingSize,
} = require("discord.js");
module.exports = {
    name: 'explore',
    aliases: ['ex'],
    description: 'Open the exploration tab or check-up on an ongoing exploration',
    async execute(event, args) {
        try {
            // check if message command or button command (reply or editReply)
            let isMessage = true
            if (event.constructor.name === 'ButtonInteraction') isMessage = false

            const user = isMessage ? event.author.globalName : event.user.globalName;

            // Get results
            /*
            let result_star = 'Nothing found yet...' // For the embed
            if (getRandomNumber(0, 100) >= 50) result_star = `${user} has found the star!`
            */

            const result_star = getRandomNumber(0, 100);
            // Building the container

            // Button building
            const rerun = new ButtonBuilder()
                .setCustomId('explore').setLabel('Explore again').setStyle(ButtonStyle.Success);
            const buttons = new ActionRowBuilder().addComponents(rerun)

            // Seperator
            const seperator = new SeparatorBuilder({
                spacing: SeparatorSpacingSize.Medium,
                divider: false,
            });

            let exploreContainer;

            // Container building
            if (result_star >= 50) {
                exploreContainer = new ContainerBuilder()
                    .setAccentColor(0xf482fa)
                    // Title
                    .addTextDisplayComponents(
                        (textDisplay) =>
                            textDisplay.setContent(
                                `### ${user}'s Exploration`,
                            )
                    )
                    // Result
                    .addTextDisplayComponents(
                        (textDisplay) =>
                            textDisplay.setContent(
                                `${result_star}`,
                            )
                    )
                    // Buttons
                    .addSeparatorComponents(seperator)
                    .addActionRowComponents(buttons);
            } else {
                exploreContainer = new ContainerBuilder()
                    .setAccentColor(0xf482fa)
                    // Title
                    .addTextDisplayComponents(
                        (textDisplay) =>
                            textDisplay.setContent(
                                `### ${user}'s Exploration`,
                            )
                    )
                    // Result
                    .addTextDisplayComponents((textDisplay) => textDisplay.setContent(`${result_star}`))
                    .addSeparatorComponents(seperator)
                    .addTextDisplayComponents((textDisplay) => textDisplay.setContent(`${result_star}`))
                    .addSeparatorComponents(seperator)
                    .addTextDisplayComponents((textDisplay) => textDisplay.setContent(`${result_star}`))
                    .addSeparatorComponents(seperator)
                    .addActionRowComponents(buttons);
            }

            if (isMessage)
            {
                // Reply to message
                await event.reply({
                    components: [exploreContainer],
                    flags: MessageFlags.IsComponentsV2
                })
            }
            else
            {
                // Edit reply
                await event.update({
                    components: [exploreContainer],
                    flags: MessageFlags.IsComponentsV2
                })
            }

        } catch (error) {
            console.error(`An error occurred in explore. `, error)
        }
    }
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}