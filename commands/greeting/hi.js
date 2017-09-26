const commando = require('discord.js-commando');

class helloCommand extends commando.Command {
        constructor(client) {
            super(client, {
                name: "hi",
                aliases: ['hello'],
                group: 'greeting',
                memberName: 'hi',
                description: 'Hello!'
            });
        }

        async run(message, args) {
            message.channel.send('Hello!');
        }
}

module.exports = helloCommand;