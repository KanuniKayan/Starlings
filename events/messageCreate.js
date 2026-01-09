// Imports
const { Events } = require('discord.js');

// Command
module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        // Early exits and checks

        // Check if it's a bot
        if (message.author.bot) return;

        // Prefix checking
        // const prefix = await getPrefix(message.guildId);
        const prefix = '.' // Hardcoding prefix for testing
        if (!message.content.startsWith(prefix)) return;
        if (message.content.startsWith(prefix + prefix)) return; // cases like '...' still counting as a prefix

        // Store arguments (each word is an argument, including initial command)
        const args = message.content.toLowerCase().split(" ");

        // Check for channel restriction command and/or correct channel

        // Find command and arguments
        const commandName= args[0].substring(prefix.length).toLowerCase();
        const command = message.client.commands.get(commandName);
        // Check existence of command
        if (!command)
        {
            const del = await message.reply(`${message.content} does not exist`)
            setTimeout(() => {del.delete()}, 3000);
        }
        else
        {
            // call commands
            await command.execute(message, args);
        }

        const date = new Date().toLocaleString();

        // Log user's command
        console.log(`User '${message.author.username}' executed: '${commandName}' at ${date}`);
    }
}