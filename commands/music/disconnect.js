const commando = require('discord.js-commando');

class disconnect extends commando.Command {
        constructor(client) {
            super(client, {
                name: "disconnect",
                group: 'music',
                memberName: 'disconnect',
                description: 'Disconnect from voice channel'
            });
        }
        async run(message, args) {
        }
}
module.exports = disconnect;