const commando = require('discord.js-commando');

class sayCommand extends commando.Command {
        constructor(client) {
            super(client, {
                name: "say",
                group: 'greeting',
                memberName: 'say',
                description: 'Bot replies with text provided.',
                examples: ['say hello'],
                throttling: {
                    usages: 2,
                    duration: 10
                },
                args: [
                    {
                    key: 'text',
                    prompt: 'What would you like me to say?',
                    type: 'string'
                    }
                ]
            });
        }

        async run(message, args) {
            const { text } = args;
            message.delete();
            return message.say(`\u180E${text}`);
        }
}

module.exports = sayCommand;