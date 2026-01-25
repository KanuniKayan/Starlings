// Imports
const { Events, ChannelType } = require('discord.js');
const { fetchGuild, addGuild, setRestriction } = require('../queries/db_index.js');

// Command
module.exports = {
    name: Events.GuildCreate,
    async execute(guild) {
        try {
            // add server to database
            const result = await fetchGuild(guild);
            if (result.rows.length < 1) await addGuild(guild);

            console.log(`\n***********\n\nJoined guild '${guild.name}' on ${new Date().toLocaleString()}!\n\n***********\n`);

            // Check or create channel
            const channels = await guild.channels.cache;
            let exists = false;
            let bot_category;
            for (let channel of channels) {
                let name = channel[1].name;
                let type = channel[1].type;
                if (type === 4)
                {
                    if (name.toLowerCase().includes('bot')) bot_category = channel;
                }
                else if (type === 0 && name.toLowerCase().includes('starlings'))
                {
                    exists = true;
                    break;
                }
            }

            let new_channel;
            if (!exists)
            {
                if (bot_category)
                {
                    new_channel = await guild.channels.create({name: '🌟starlings', type: ChannelType.GuildText, topic: 'A dedicated Starlings channel!',
                        parent: bot_category[1].id})
                        .catch(console.error);
                }
                else
                {
                    new_channel = await guild.channels.create({name: '🌟starlings', type: ChannelType.GuildText, topic: 'A dedicated Starlings channel!'})
                        .catch(console.error);
                }
            }

            // restrict to channel
            await setRestriction(guild.id, new_channel.id)
                .then(console.log(`Set channel restriction for server '${guild.id}' with NEW channelId '${new_channel.id}'`))
                .catch(console.error);

        } catch (error) {
            console.error(`Something went wrong in guildCreate. `, error);
        }
    }
}