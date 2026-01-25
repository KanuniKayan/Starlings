// Imports
const { Events } = require('discord.js');
const { query } = require('../database.js')

// Command
module.exports = {
    name: Events.GuildDelete,
    async execute(guild) {
        try {
            await query("DELETE FROM servers WHERE server_id = $1;", [guild.id]);
            console.log(`Server '${guild.id} successfully deleted.'`);
        } catch (error) {
            console.error(`Something went wrong in guildDelete. `, error);
        }
    }
}