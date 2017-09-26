const commando = require('discord.js-commando');

class skip extends commando.Command {
        constructor(client) {
            super(client, {
                name: "skip",
                group: 'music',
                memberName: 'skip',
                description: 'skip a song'
            });
        }
        async run(message, args) {
        }

}
module.exports = skip;