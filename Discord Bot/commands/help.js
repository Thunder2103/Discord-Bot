
module.exports = {
    name: 'help', 
    description: "the help command!", 
    execute(message, Discord, client){  //lists the commands, what they do amd what they need to work
        //sends follwing message to user who typed command 
        message.author.send(`  
Random II bot commands: - A bot made by Tom - 
Useful commands: 
    Music: 
        //play [text or URL]
        //skip  
        //stop
    Mute: -Selected few only - 
        //mute @[user] [Time]
        //unmute @[user] 
        Time: s - seconds. m - minutes. h- hours. 
    Images: 
        //image [what you want to search] 
    Suggestion: 
        //suggest [your suggestion] -Will I do it? Probably depends how bad it is- 
Useless commands:
    Repeat: 
        //repeat [text you want to repeat]
    Ping:    
        //ping
        
        `);
        
       
    }
}














