const crypto = require('crypto');
const fs = require('fs');
const {Discord, Intents, Client, MessageEmbed, CategoryChannel} = require("discord.js");

var raidNames = { 
    "valtannm" : "Valtan NM",
    "valtanhm" : "Valtan HM",
    "argosp1" : "Argos P1",
    "argosp2" : "Argos P2",
    "argosp3" : "Argos P3"  
}

var raidImageUrl = { 
    "valtannm" : "https://images.ctfassets.net/umhrp0op95v1/59ANV8Y1vC75lMI7UQvAbu/df0b4047580e6839a9818cbaa53b5d75/episode_Valtan_08_740x416.jpg",
    "valtanhm" : "https://images.ctfassets.net/umhrp0op95v1/59ANV8Y1vC75lMI7UQvAbu/df0b4047580e6839a9818cbaa53b5d75/episode_Valtan_08_740x416.jpg",
    "argosp1" : "https://images.ctfassets.net/umhrp0op95v1/5v2TFYLVPOvbVOD2KIzn9u/1aed88002d0a672ad015a498b9925b1f/Argos_Main_Art_740x416.jpg",
    "argosp2" : "https://images.ctfassets.net/umhrp0op95v1/5v2TFYLVPOvbVOD2KIzn9u/1aed88002d0a672ad015a498b9925b1f/Argos_Main_Art_740x416.jpg",
    "argosp3" : "https://images.ctfassets.net/umhrp0op95v1/5v2TFYLVPOvbVOD2KIzn9u/1aed88002d0a672ad015a498b9925b1f/Argos_Main_Art_740x416.jpg"  
}

//json template
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

//create raid id
function createId() {
  return crypto.randomBytes(5).toString('hex')
}

//generate embed template
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
        .setFooter({ text: 'Testing'});

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

//general function to edit raid list
function editRaid(joinleave, userName, userGameClass, raidId, raidData) {
    classData = Object.values(raidData[raidId].class)
    partyData = Object.values(raidData[raidId].party)
    
    classArray = classData.slice(0, raidData[raidId].count)
    partyArray = partyData.slice(0, raidData[raidId].count)
    
    if (joinleave == "join"){
        classArray.push(userGameClass)
        partyArray.push(userName)
        raidData[raidId].count += 1
    }
    else if (joinleave == "leave"){
        let index = partyArray.indexOf(userName)
        classArray.splice(index, 1)
        partyArray.splice(index, 1)     
        raidData[raidId].count -= 1
    }
    
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


module.exports = { createId, createData, raidTemplate, editRaid};