const crypto = require('crypto');
const {Discord, Intents, Client, MessageEmbed, CategoryChannel} = require("discord.js");

function createId() {
  return crypto.randomBytes(5).toString('hex')
}

function createData(raidName, displayTime, raidId) {
  var newRaid = {   
    [raidId]: {
        "name": raidName,
        "datetime": displayTime,
        "party": {
            "member1": " ",
            "member2": " ",
            "member3": " ",
            "member4": " ",
            "member5": " ",
            "member6": " ",
            "member7": " ",
            "member8": " "
        },
        "class": {
            "member1": " ",
            "member2": " ",
            "member3": " ",
            "member4": " ",
            "member5": " ",
            "member6": " ",
            "member7": " ",
            "member8": " "
        }       
    }
  }
  return newRaid
}

function createId() {
  return crypto.randomBytes(5).toString('hex')
}

function raidTemplate(message, raidName, raidTime, raidId, raidData) {
    const embedMsg = new MessageEmbed()
        .setTitle(raidName)
        .setDescription("Raid ID: " + raidId)
        .setAuthor(
            { name: message.author.tag,
            iconURL: message.author.avatarURL()}
        )
        .addFields(
            { name: "Date & Time: ", value: raidTime}
        )
        .setImage('https://gamesfuze.b-cdn.net/wp-content/uploads/2022/05/image-6-38.jpg')
        .setFooter({ text: 'Pizza on pineapple'});

    field1 = "1: " + raidData[raidId].party.member1 + " (" + raidData[raidId].class.member1 + ")" + "\n" 
              + "2: " + raidData[raidId].party.member2 + " (" + raidData[raidId].class.member2 + ")" + "\n"
              + "3: " + raidData[raidId].party.member3 + " (" + raidData[raidId].class.member3 + ")" + "\n"
              + "4: " + raidData[raidId].party.member4 + " (" + raidData[raidId].class.member4 + ")" + "\n\u200B"
    field2 = "1: " + raidData[raidId].party.member5 + " (" + raidData[raidId].class.member5 + ")" + "\n" 
              + "2: " + raidData[raidId].party.member6 + " (" + raidData[raidId].class.member6 + ")" + "\n"
              + "3: " + raidData[raidId].party.member7 + " (" + raidData[raidId].class.member7 + ")" + "\n"
              + "4: " + raidData[raidId].party.member8 + " (" + raidData[raidId].class.member8 + ")" + "\n\u200B"

    embedMsg.addFields(
      { name: "Party 1: " , value: field1},
      { name: "Party 2: " , value: field2}
    )
    return embedMsg
}




module.exports = { createId, createData, raidTemplate};