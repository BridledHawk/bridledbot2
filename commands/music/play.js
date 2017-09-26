const commando = require('discord.js-commando');

class play extends commando.Command {
        constructor(client) {
            super(client, {
                name: "play",
                group: 'music',
                memberName: 'play',
                description: 'Play music'
            });
        }
        async run(message, args) {
        }
}
module.exports = play;