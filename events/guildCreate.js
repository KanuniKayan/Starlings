// Imports
const { Events } = require('discord.js');
const { addGuild } = require('../queries/db_index.js');

// Command
module.exports = {
    name: Events.GuildCreate,
    async execute(guild) {
        try {
            // add server to database
            await addGuild(guild);
            console.log(`\n***********\n\nJoined guild '${guild.name}' on ${new Date().toLocaleString()}!\n\n***********\n\n`);
        } catch (error) {
            console.error(`Something went wrong in guildCreate. `, error);
        }
    }
}