const crypto = require('crypto');
const fs = require('fs');
const {Discord, Intents, Client, MessageEmbed, CategoryChannel} = require("discord.js");

function createId() {
    return crypto.randomBytes(5).toString('hex')
}

var raidNames = { 
    "valtannm" : "Valtan NM",
    "valtanhm" : "Valtan HM",
    "argosp1" : "Argos P1",
    "argosp2" : "Argos P2",
    "argosp3" : "Argos P3"  
}

var raidImageUrl = { 
    "valtannm" : "https://cdn1.dotesports.com/wp-content/uploads/2022/04/05083554/image_2022-04-05_153554552.png",
    "valtanhm" : "https://cdn1.dotesports.com/wp-content/uploads/2022/04/05083554/image_2022-04-05_153554552.png",
    "argosp1" : "https://cdn.mos.cms.futurecdn.net/aH7EvG7MWka2hJACFFh7ei-970-80.jpg.webp",
    "argosp2" : "https://cdn.mos.cms.futurecdn.net/aH7EvG7MWka2hJACFFh7ei-970-80.jpg.webp",
    "argosp3" : "https://cdn.mos.cms.futurecdn.net/aH7EvG7MWka2hJACFFh7ei-970-80.jpg.webp"  
}


function createData(raidName, displayTime, raidId) {
    var newRaid = {   
      [raidId]: {
          "name": raidName,
          "datetime": displayTime,
          "count" : 0,
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

function raidTemplate(message, raidId, raidData) {
    raidName = raidNames[raidData[raidId].name]
    raidTime = raidData[raidId].datetime
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
        .setImage(raidImageUrl[raidData[raidId].name])
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

function joinRaid(userName, userGameClass, raidId, raidData) {
    classData = Object.values(raidData[raidId].class)
    partyData = Object.values(raidData[raidId].party)
    
    classArray = classData.slice(0, raidData[raidId].count)
    partyArray = partyData.slice(0, raidData[raidId].count)
    
    classArray.push(userGameClass)
    partyArray.push(userName)
    
    raidData[raidId].count += 1
    
    for (i = 0; i < 8 - raidData[raidId].count; i++){
        classArray.push(" ")
        partyArray.push(" ")
    }

    let tempCount = 0
    for (keys in raidData[raidId].class) {
        raidData[raidId].class[keys] = classArray[tempCount]
        raidData[raidId].party[keys] = partyArray[tempCount]
        tempCount += 1
    }

    return raidData
}


module.exports = { createId, createData, raidTemplate, joinRaid};