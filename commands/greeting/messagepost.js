const commando = require('discord.js-commando');

class taim extends commando.Command {
        constructor(client) {
            super(client, {
                name: "taim",
                group: 'greeting',
                memberName: 'taim',
                description: 'Reign of Darkness'
            });
        }

     async run(message, args) {
        message.channel.sendMessage("Thy Art Is Murder", {
        file: "http://www.rockfeed.net/wp-content/uploads/2016/10/thy-art-is-murder-logo.jpg"
        });
    }
}

module.exports = taim;