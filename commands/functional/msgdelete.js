const discord = require('discord.js');
const commando = require('discord.js-commando');

class msgdelete extends commando.Command {
        constructor(client) {
            super(client, {
                name: "msgdelete",
                aliases: ['messagedelete', 'prune', 'purge', 'clean', 'cls'],
                group: 'functional',
                memberName: 'msgdelete',
                description: 'Deletes the last 100 messages.',
            });
        }

        async run(message, args) {
            message.channel.fetchMessages({limit: 100}).then(messages => message.channel.bulkDelete(messages));
        }
}

module.exports = msgdelete;