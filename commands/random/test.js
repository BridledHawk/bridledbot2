const commando = require('discord.js-commando');

class test extends commando.Command {
        constructor(client) {
            super(client, {
                name: "test",
                group: 'random',
                memberName: 'test',
                description: 'test. runs from code in index.js'
            });
        }

        async run(message, args) {
        }
}

module.exports = test;