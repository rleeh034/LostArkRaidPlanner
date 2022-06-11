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

        //!create valtanhm YYYY-MM-DD HH:mm:ss
        if (command == "create"){
            let raidName = args[0]
            let ownDate = args[1]
            let ownTime = args[2]

            //convert arguments to useable data
            unixDateTime = moment(ownDate + " " + ownTime, 'YYYY-MM-DD HH:mm:ss').valueOf()/1000
            displayDate = "<t:" + unixDateTime + ":F>"
            let raidId = fx.createId()

            //read current json data
            rawdata = fs.readFileSync('data.json');
            currData = JSON.parse(rawdata);
            
            //create new raid data 
            newData = fx.createData(raidName, displayDate, raidId)

            //append new data into curr data
            combData = Object.assign(currData, newData)
            
            //generate embed message
            embedMsg = fx.raidTemplate(message, raidId, combData)
            
            //rewrite combined data into json file
            fs.writeFileSync('data.json', JSON.stringify(combData, null, 2));

            //send embed message
            message.channel.send({ embeds: [embedMsg] })
        }


        if (command == "list"){
            
            //read current json data
            rawdata = fs.readFileSync('data.json')
            currData = JSON.parse(rawdata)
            
            const embedList = new MessageEmbed()
                .setTitle("Raid List")

            let nameField = "\u200B"
            let dateField = "\u200B"
            let idField = "\u200B"
            
            length = Object.keys(currData).length
            
            //append string data of names, date and id 
            for (let i = 0; i < length; i++)
            {   
                key = Object.keys(currData)[i]
                nameField = nameField + raidNames[currData[key].name] + " (" + currData[key].count + "/8)" + "\n"
                dateField = dateField + currData[key].datetime + "\n"
                idField = idField + key + "\n"
            }

            embedList.addFields(
                { name: "Raid (Players)", value: nameField, inline: true},
                { name: "Date", value: dateField, inline: true},
                { name: "ID", value: idField, inline: true},
            )

            message.channel.send({ embeds: [embedList] })
        }


        if (command == "join"){
            let raidId = args[0]
            let userName = args[1]
            let userGameClass = args[2]
            
            //read current json data
            rawdata = fs.readFileSync('data.json')
            currData = JSON.parse(rawdata)
            //add user data
            if (currData[raidId].count < 8){
                currData = fx.joinRaid(userName, userGameClass, raidId, currData)
            }
            else{
                return message.channel.send("Raid is full!")
            }

            //generate embed message
            embedMsg = fx.raidTemplate(message, raidId, currData)
            
            //write data into json file
            fs.writeFileSync('data.json', JSON.stringify(currData, null, 2))

            message.channel.send({ embeds: [embedMsg] })
        }

        if (command == "delete"){
            let raidId = args[0]
            
            //read current json data
            rawdata = fs.readFileSync('data.json')  
            currData = JSON.parse(rawdata)

            //delete data
            delete currData[raidId]

            //write data into json file
            fs.writeFileSync('data.json', JSON.stringify(currData, null, 2))

            message.reply("Raid (ID: " + raidId + ") has been deleted.")
        }

});

client.login(process.env.BOT_TOKEN)