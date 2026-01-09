// Displaying ready state of client

// Imports
const { Events } = require('discord.js');
const { setDbClient } = require('queries/db_index.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`Logged in as ${client.user.tag}`);
        await setDbClient(client);
        console.log(`Bot fully initialized!`);
    }
}