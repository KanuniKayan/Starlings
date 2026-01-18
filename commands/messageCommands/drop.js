// Testing command for dropdown functionality

const { ComponentType, EmbedBuilder, SectionBuilder, SeparatorBuilder, SeparatorSpacingSize, ButtonStyle, MessageFlags,
    ContainerBuilder, ActionRowBuilder, ButtonBuilder
} = require('discord.js')

let savedId;

module.exports = {
    name: 'drop',
    aliases: ['dropdown', 'd'],
    description: 'A testing command for a dropdown system.',
    async execute(message, args) {
        try {

            const exampleSection = new SectionBuilder()
                .addTextDisplayComponents(
                    (textDisplay) =>
                        textDisplay.setContent(
                            'This is the first text display.\n'
                        ),
                )
                .setButtonAccessory((button) =>
                    button.setCustomId('exampleButton').setLabel('Example Button').setStyle(ButtonStyle.Primary),
                );

            const exampleSection2 = new SectionBuilder()
                .addTextDisplayComponents(
                    (textDisplay) =>
                        textDisplay.setContent(
                            'This is the second text display.\n'
                        ),
                )
                .setButtonAccessory((button) =>
                    button.setCustomId('exampleButton2').setLabel('Example Button').setStyle(ButtonStyle.Secondary),
                );

            const exampleSeparator = new SeparatorBuilder({
                spacing: SeparatorSpacingSize.Small,
                divider: true,
            });

            const exampleEmbed = new EmbedBuilder()
                .addFields(
                    {name: '', value: 'First field'},
                    {name: '', value: 'Second field'},
                );

            const b1 = new ButtonBuilder().setCustomId("b1").setLabel("Example Button").setStyle(ButtonStyle.Success);
            const b2 = new ButtonBuilder().setCustomId("b2").setLabel("Example Button").setStyle(ButtonStyle.Success);
            const b3 = new ButtonBuilder().setCustomId("b3").setLabel("Example Button").setStyle(ButtonStyle.Success);
            const b4 = new ButtonBuilder().setCustomId("b4").setLabel("Example Button").setStyle(ButtonStyle.Success);
            const b5 = new ButtonBuilder().setCustomId("b5").setLabel("Example Button").setStyle(ButtonStyle.Success);
            const b6 = new ButtonBuilder().setCustomId("b6").setLabel("Example Button").setStyle(ButtonStyle.Success);

            const row = new ActionRowBuilder()
                .addComponents(b1, b2, b3, b4, b5)

            const row2 = new ActionRowBuilder()
                .addComponents(b6)

            const exampleContainer = new ContainerBuilder()
                .setAccentColor(0xf482fa)
                .addTextDisplayComponents(
                    (textDisplay) => textDisplay.setContent("This is the first textDisplay."),
                )
                .addSeparatorComponents((separator) => exampleSeparator)
                .addTextDisplayComponents(
                    (textDisplay) => textDisplay.setContent("This is the second textDisplay."),
                )
                .addSeparatorComponents((separator) => exampleSeparator)
                .addTextDisplayComponents(
                    (textDisplay) => textDisplay.setContent("This is the third textDisplay."),
                )
                .addActionRowComponents(row)
                .addSeparatorComponents((separator) => exampleSeparator)
                .addTextDisplayComponents(
                    (textDisplay) => textDisplay.setContent("This is the fourth textDisplay."),
                )
                .addActionRowComponents(row2)
                .addSeparatorComponents((separator) => exampleSeparator)
                .addTextDisplayComponents(
                    (textDisplay) => textDisplay.setContent("This is the fifth textDisplay."),
                )

            const initialMessage = await message.channel.send({
                components: [exampleContainer],
                flags: MessageFlags.IsComponentsV2
            });

            let collector;
            const collectorFilter = (i) => {
                return i.message.id === initialMessage.id;
            }

            collector = message.channel.createMessageComponentCollector({filter: collectorFilter, componentType: ComponentType.Button, time: 15_000})

            collector.on('collect', async (i) => {
                savedId = i.component.data.custom_id;
                i.deferUpdate();
            });

            collector.on('end', async (collected, reason) => {
               message.channel.send(`Saved_id: ${savedId}`)
            });


        } catch (error) {
            console.error(`An error occurred in dropdown. `, error)
        }
    }
}