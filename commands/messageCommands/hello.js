// Say hello to the bot

module.exports = {
    name: 'hello',
    aliases: ['hi'],
    description: 'Say hello to the bot',
    execute(message, args) {
        try {
            message.channel.send(`Hello ${message.author.globalName}!`);
        } catch (error) {
            console.error(`An error occurred in hello: `, error)
        }
    }
}