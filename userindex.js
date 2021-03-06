const discord = require('discord.js');
const commando = require('discord.js-commando');
const YTDL = require('ytdl-core');


const bot = new commando.Client({
    owner: '251331336726511617',
    commandPrefix: '/',
    unknownCommandResponse: false
});

const taimembed = new discord.RichEmbed().setImage("http://www.rockfeed.net/wp-content/uploads/2016/10/thy-art-is-murder-logo.jpg")

function play(connection, message) {
    var server = servers[message.guild.id];
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
    server.queue.shift();
    server.dispatcher.on("end", function() {
        if (server.queue[0]) {
            YTDL.getInfo(server.queue[0], function(err, info){
                message.channel.send(`Now playing: \`${info.title}\``);
                if (info.title.toLocaleLowerCase.includes('thy art is murder')) {
                    message.channel.send({taimembed});
                };
            });
            play(connection, message);
        }
        else connection.disconnect();
    })
}

var port = process.env.PORT || 8000
var servers = {};
var toggleq = true;
// bot.on('',''=> {});

//log in console and give info in chat
bot.on('ready', () => {
    console.log('Ready!');
});

//role events

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

    if (message.content.startsWith(prefix + 'toggleq')) {
        if (toggleq) {
            toggleq = false;
            message.channel.send("off");
            return;
        }
        if (!toggleq) {
            toggleq = true;
            message.channel.send("on");
            return;
        }
    }
//    console.log(
    if (message.content.startsWith(prefix + 'play')) {
        if(!args[1]) {
            message.channel.send("Provide a link!");
            return;
        }

        if (!message.member.voiceChannel) {
            message.channel.send('You must be in a voice channel to use this command!')
            return;
        }


        if (YTDL.validateLink(args[1])) {
            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };
            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                message.channel.send("Joining your voice channel.");
                YTDL.getInfo(server.queue[0], function(err, info){
                    message.channel.send(`Now playing: \`${info.title}\``)
                });
                play(connection, message)

            });
            var server = servers[message.guild.id];
            if (toggleq) {
                server.queue.push(args[1]);
                message.channel.send( `Song added to queue! ${server.queue.length} songs in queue.`);
            };
            if (!toggleq) {
                if (server.queue.length <= 0) {
                    server.queue.push(args[1]);
                    message.channel.send( `Song added to queue! ${server.queue.length} songs in queue.`);
                }
                else {
                    message.channel.send(`Music queue is set to off. type ${bot.commandPrefix}toggleq to enable it.`)
                };
            };
        };
        if (!YTDL.validateLink(args[1])) {
            message.channel.send('Invalid Link. Make sure the link is like the following: `https://www.youtube.com/watch?v=aPXU_2vDmi8`');
        };
    };

    if (message.content.startsWith(prefix + 'skip')) {
        var server = servers[message.guild.id];
        message.channel.send( `Song skipped! ${server.queue.length} songs in queue.`);
        if (server.dispatcher) server.dispatcher.end();
    };

    if (message.content.startsWith(prefix + 'disconnect')) {
        var server = servers[message.guild.id];
        if (message.guild.voiceConnection)
        {
            for (var i = server.queue.length - 1; i >= 0; i--) 
            {
                server.queue.splice(i, 1);
         };
            server.dispatcher.end();
            console.log("[" + new Date().toLocaleString() + "] Stopped the queue.");
            message.channel.send("dc");
            return;
        };
    };



});

bot.login(process.env.BOT_TOKEN);
