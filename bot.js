require("dotenv").config();
var fx = require('./functions');
var moment = require('moment');
const fs = require('fs');
const {Discord, Intents, Client, MessageEmbed, CategoryChannel} = require("discord.js");
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
            let raidName = args[0]
            let ownDate = args[1]
            let ownTime = args[2]

            //convert arguments to useable data
            unixDateTime = moment(ownDate + " " + ownTime, 'YYYY-MM-DD HH:mm:ss').valueOf()/1000
            displayDate = "<t:" + unixDateTime + ":F>"
            var raidId = fx.createId()

            //read current json data
            rawdata = fs.readFileSync('data.json');
            currData = JSON.parse(rawdata);
            
            //create new raid data 
            newData = fx.createData(raidName, displayDate, raidId)

            //append new data into curr data
            combData = Object.assign(currData, newData)
            
            //generate embed message
            embedMsg = fx.raidTemplate(message, raidNames[raidName], displayDate, raidId, combData)
            
            //rewrite combined data into json file
            fs.writeFileSync('data.json', JSON.stringify(combData, null, 2));

            //send embed message
            message.channel.send({ embeds: [embedMsg] })
        }


        if (command == "nani"){
            message.channel.send("https://tenor.com/view/stoned-cat-stoned-cat-funny-huh-gif-19222132")
        }


        if (command == "list"){
            
            //read current json data
            rawdata = fs.readFileSync('data.json');
            currData = JSON.parse(rawdata);
            
            const embedList = new MessageEmbed()
                .setTitle("Raid List")

            var nameField = "\u200B"
            var dateField = "\u200B"
            var idField = "\u200B"
            
            length = Object.keys(currData).length
            
            //append string data of names, date and id 
            for (let i = 0; i < length; i++)
            {   
                key = Object.keys(currData)[i]
                nameField = nameField + raidNames[currData[key].name] + "\n"
                dateField = dateField + currData[key].datetime + "\n"
                idField = idField + key + "\n"
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