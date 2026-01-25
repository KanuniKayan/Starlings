// Imports
const { Events } = require('discord.js');
const { query } = require('../database.js')

// Command
module.exports = {
    name: Events.GuildUpdate,
    async execute(guild) {
        try {
            await query("UPDATE servers SET server_name = $2 WHERE server_id = $1;", [guild.id, guild.name]);
            console.log(`Updated server name of '${guild.id}' to '${guild.name}'.`);
        } catch (error) {
            console.error(`Something went wrong in guildDelete. `, error);
        }
    }
}