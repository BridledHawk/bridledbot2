const commando = require('discord.js-commando');

class ayy extends commando.Command {
        constructor(client) {
            super(client, {
                name: "ayy",
                group: 'random',
                memberName: 'ayy',
                description: 'Ayy lmao'
            });
        }

        async run(message, args) {
            message.channel.send('lmao :alien:');
        }
}

module.exports = ayy;