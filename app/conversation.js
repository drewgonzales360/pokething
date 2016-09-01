/****************************************************************
FileName: conversation.js
Kenneth Drew Gonzales

Description:
This file will handle the conversations that the main player has
with other characters in the game. 

Last Edited: 8/29/16
****************************************************************/

var conversations = {}
conversations["@Crowd 1"] = "I'm number 1."
conversations["@Crowd 2"] = "I'm number 2."
conversations["@Crowd 3"] = "I'm number 3."
conversations["@Crowd 4"] = "I'm number 4."
conversations["@Crowd 5"] = "I'm number 5."
conversations["@Crowd 6"] = "I'm number 6."
conversations["@Crowd 7"] = "I'm number 7."
conversations["@Crowd 8"] = "I'm number 8."
conversations["@Crowd 9"] = "I'm number 9."
conversations["@Crowd"]   = "Hash workds"

module.exports = {
    conversation: function( npc ){
        console.assert(typeof npc === "string");
        return npc;
    }
}
