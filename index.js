const discord = require('discord.js');
const commando = require('discord.js-commando');
const YTDL = require('ytdl-core');

const bot = new commando.Client({
    owner: '251331336726511617',
    commandPrefix: '/',
    unknownCommandResponse: false
});

function play(connection, message) {
    var server = servers[message.guild.id];
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
    message.channel.send( `${server.queue.length} songs in queue.`);
    server.queue.shift();
    server.dispatcher.on("end", function() {
        if (server.queue[0]) {
            play(connection, message);
        }
        else connection.disconnect();
    })
}
var port = process.env.PORT || 8000
var servers = {};
// bot.on('',''=> {});

//log in console and give info in chat
bot.on('ready', () => {
    console.log('Ready!');
});

//role events

bot.on('roleCreate', role => {
    let guild = role.guild;
    guild.defaultChannel.send(`A new role called ${role.name} has been created!`);
});

bot.on('roleDelete', role => {
    let guild = role.guild;
    guild.defaultChannel.send(`The role ${role.name} has been deleted!`);
});

//guild events
bot.on('guildCreate', guild => {
    guild.defaultChannel.send(`I have joined ${guild.name}`);
});

bot.on('guildMemberAdd', member => {
    let guild = member.guild;
    guild.defaultChannel.send(`Welcome to the server, ${member.user}!`);
});

bot.on('guildMemberRemove', member => {
    let guild = member.guild;
    guild.defaultChannel.send(`${member.user} has left the server!`);
});

bot.on('channelCreate', channel => {
    if (channel.type === 'text') return channel.send(`Text channel created successfully!`);
});


bot.registry.registerGroups([
    ['random', 'Random'],
    ['functional', 'Functional'],
    ['greeting', 'Greeting'],
    ['music', 'Music']
]);
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

//message commands

var prefix = bot.commandPrefix

bot.on('message', message => {
    var guild = message.guild;


    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;

    var args = message.content.substring(prefix.length).split(" ");
    var result = args.join(' ');

    if (message.content.startsWith(prefix + 'test')) {
        message.channel.send('Test successfull!');
    }

    if (message.content.startsWith(prefix + 'play')) {
        if(!args[1]) {
            message.channel.send("Provide a link!");
            return;
        }

        if (!message.member.voiceChannel) {
            message.channel.send('You must be in a voice channel to use this command!')
            return;
        }


        if (args[1].includes("https://www.youtube.com/watch")) {
            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }
            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                message.channel.send("Joining your voice channel.");
                play(connection, message)
            });
            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            message.channel.send( `Song added to queue! ${server.queue.length} songs in queue.`);
        }
        if (!args[1].includes("https://www.youtube.com/watch?v=")) {
            message.channel.send('Invalid Link. Make sure the link is like the following: `https://www.youtube.com/watch?v=aPXU_2vDmi8`');
        }
    }

    if (message.content.startsWith(prefix + 'skip')) {
        var server = servers[message.guild.id];
        if (server.dispatcher) server.dispatcher.end();
        message.channel.send( `Song skipped! ${server.queue.length} songs in queue.`);
    }

    if (message.content.startsWith(prefix + 'disconnect')) {
        var server = servers[message.guild.id];
        if (message.guild.voiceConnection)
        {
            for (var i = server.queue.length - 1; i >= 0; i--) 
            {
                server.queue.splice(i, 1);
         }
            server.dispatcher.end();
            console.log("[" + new Date().toLocaleString() + "] Stopped the queue.");
            message.channel.send("Successfully disconnected from voice channel!");
            return;
        }
    }
    if (message.content.startsWith(prefix + 'join')) {
        message.member.voiceChannel.join().then(function(connection) {
        message.channel.send("Joining your voice channel.");
        }
    )}

    if (message.content.startsWith(prefix + 'setgame')) {
        bot.user.setGame(args[1]);
    }
});

bot.login(process.env.BOT_TOKEN);
