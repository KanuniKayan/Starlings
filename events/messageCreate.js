// Imports
const { Events } = require('discord.js');
const { getPrefix } = require("../queries/db_index.js");

// Command
module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        try {
            // check correct channel
            if (message.author.bot) return;

            // Prefix checking
            let prefix;
            try {
                prefix = await getPrefix(message.guildId);
            } catch (error) {
                console.error(`Failed to get prefix.`, error);
                return;
            }
            const content = message.content;
            if (!content.startsWith(prefix)) return;
            if (content === prefix) return;
            if (content.startsWith(prefix + prefix)) return;

            // Find command and arguments
            const args = content.substring(prefix.length).toLowerCase().split(" ");
            const commandName = args[0];

            if (commandName === 'restrict')
            {
                // Set current channel to restriction
                return
            }

            let command;
            try {
                command = message.client.commands.get(commandName);
            } catch (error) {
                console.error(`failed to get commands. `, error);
                return;
            }

            // Check existence of command
            if (!command) {
                const del = await message.reply(`${content} does not exist`)
                setTimeout(() => {
                    del.delete()
                }, 3000);
            } else {
                // call commands
                try {
                    await command.execute(message, args);
                } catch (e) {
                    console.error(`failed to activate command. `, e);
                    return;
                }
            }

            // Log user's command
            console.log(`User '${message.author.username}' executed: '${commandName}' at ${new Date().toLocaleString()}`);
        } catch (error) {
            console.error(`Something went wrong in messageCreate. `, error);
        }
    }
}