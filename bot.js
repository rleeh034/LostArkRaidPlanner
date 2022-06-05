require("dotenv").config(); 

var moment = require('moment');

const {Discord, Intents, Client, MessageEmbed, CategoryChannel} = require("discord.js");
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});
const prefix = "!";

client.on("ready", function() {
    console.log("Connected")
});

client.on("messageCreate", function(message) {
        if (message.author.bot) return;     //if own message, ignore
        if (!message.content.startsWith(prefix)) return;    //if do not start with '!' (not command), ignore
        
        const msgBody = message.content.slice(prefix.length); 
        const args = msgBody.split(" ");    
        const command = args.shift().toLowerCase();     
        //test
        //!create valtanhm YYYY-MM-DD HH:mm:ss
        if (command == "create"){
            let raidType = args[0]
            let ownDate = args[1]
            let ownTime = args[2]

            unixDateTime = moment(ownDate + " " + ownTime, 'YYYY-MM-DD HH:mm:ss').valueOf()/1000
            message.channel.send(ownDate + ownTime + raidType + " at " + "<t:" + unixDateTime + ":F>")
        }
      
        if (command == "nani"){
            message.channel.send("https://tenor.com/view/stoned-cat-stoned-cat-funny-huh-gif-19222132")
        }
});

client.login(process.env.BOT_TOKEN)