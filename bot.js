require("dotenv").config(); 
var fx = require('./functions');

var moment = require('moment');

const {Discord, Intents, Client, MessageEmbed, CategoryChannel} = require("discord.js");
const { raidId } = require("./functions");
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

const prefix = "!";

var raidNames = { 
    "valtannm" : "Valtan NM",
    "valtanhm" : "Valtan HM",
    "argosp1" : "Argos P1",
    "argosp2" : "Argos P2",
    "argosp3" : "Argos P3"  
}

var raidList = new Array()

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
            displayDate = "<t:" + unixDateTime + ":F>"
            var raidId = fx.createId()

            raidList.push([raidNames[raidType], displayDate, raidId,])

            const embedMsg = new MessageEmbed()
                .setTitle(raidNames[raidType])
                .setDescription("Raid ID: " + raidId)
                .setAuthor(
                    { name: message.author.tag,
                    iconURL: message.author.avatarURL()}
                )
                .addFields(
                    { name: "Date & Time: ", value: displayDate}
                )
                .setImage('https://gamesfuze.b-cdn.net/wp-content/uploads/2022/05/image-6-38.jpg')
                .setFooter({ text: 'Pizza on pineapple'});

            p11 = " "
            p12 = " "     
            p13 = " "
            p14 = " "
            p21 = " "
            p22 = " "
            p23 = " "
            p24 = " "

            field1 = "1: " + p11 + "\n" + "2: " + p12 + "\n" + "3: " + p13 + "\n" + "4: " + p14 + "\n\u200B"
            field2 = "1: " + p21 + "\n" + "2: " + p22 + "\n" + "3: " + p23 + "\n" + "4: " + p24 + "\n\u200B"
            
            embedMsg.addFields(
                { name: "Party 1: " , value: field1},
                { name: "Party 2: " , value: field2}
            )

            message.channel.send({ embeds: [embedMsg] })
        }
        if (command == "nani"){
            message.channel.send("https://tenor.com/view/stoned-cat-stoned-cat-funny-huh-gif-19222132")
        }

        if (command == "list"){

            const embedList = new MessageEmbed()
                .setTitle("Raid List")

            var nameField = "\u200B"
            var dateField = "\u200B"
            var idField = "\u200B"
 
            for (let i = 0; i < raidList.length; i++)
            {   
                nameField = nameField + raidList[i][0] + "\n"
                dateField = dateField + raidList[i][1] + "\n"
                idField = idField + raidList[i][2] + "\n"
            }

            embedList.addFields(
                { name: "Name", value: nameField, inline: true},
                { name: "Date", value: dateField, inline: true},
                { name: "ID", value: idField, inline: true},
            )

            message.channel.send({ embeds: [embedList] })
        }
});

client.login(process.env.BOT_TOKEN)