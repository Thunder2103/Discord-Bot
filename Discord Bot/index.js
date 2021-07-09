//better command handling
//server Qol stuff (see notebook)
//music bot, check next in queue... 
//tests (do this on deployement)

const Discord = require('discord.js');  //dependecy, what we need for the code to work 

const client = new Discord.Client(); 

const prefix = '//'; //this is how the bot knows a message is for it. e.g //ping


const ms = require('ms'); //dependecies, need this for code to work 
const fs = require('fs'); 

var timer; 


function startTime(memTarget, userRoles, args, message) //timer for mute command 
{
    timer = setTimeout(function() //when timer reaches zero...
        {
            
           
            
            var mute = message.guild.roles.cache.find(role => role.name === 'Mute');  //define mute role 
           
            memTarget.roles.remove(mute.id); //remove mute ID
            memTarget.roles.set(userRoles); //add all previous roles
            message.reply(`<@${memTarget.user.id}> has been unmuted`); //message confirm unmute
          
          
           
        

        }, ms(args[1])); //sets timer, timer value depends on user input 
        
        
    
} 


function stopTime(timer) //stops timer for unmute command
    {
        
      
        clearTimeout(timer) //stops current timer 
        
    }





client.commands = new Discord.Collection(); //this is how commands will be called, they are stored in a seprate folder called 'commands' 

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js')); //filters out any files in commands folder without .js suffix

for(const file of commandFiles){
    const command = require(`./commands/${file}`);  //gets all files with .js suffix 

    client.commands.set(command.name, command); //gets the name of these files e.g play, image, ping 
}

client.once('ready' , () => 
{
    console.log('The bot is online!') //sends a message to the console when the bot is online
    client.user.setActivity('Random Bot II //help' , {type: 'PLAYING'}); //sets the bot status, the //help command is shown so first time users can get a list of commands. 
    
    

});  




client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return; //bot ignores message if there's no prefix 

    const args = message.content.slice(prefix.length).split(/\s+/); //splits the message so bot can get command and any parameters it has. 
    const command = args.shift().toLowerCase(); //makes all of the message into lower case 
    
    
   

       
    //all the commands the bot can currently execute... 
    

    if(command === 'ping'){ //if the user types the command - ping
        client.commands.get('ping').execute(message, args, Discord); //file with subsequent name is found and executed 

    }
    else if(command === 'video'){
        client.commands.get('favweb').execute(message, args, Discord);
    }
    else if(command === 'clear'){
        client.commands.get('clear').execute(message, args, Discord); 
        
    }
    else if(command === 'mute')
    {
        client.commands.get('mute').execute(message, args, Discord, command, startTime, timer);
        
    
    }
    else if(command === 'unmute')
    {
        client.commands.get('mute').execute(message, args, Discord, command, timer, stopTime, timer);
         
    }
    else if(command === 'repeat')
    {
        client.commands.get('repeat').execute(message, args, Discord, prefix); 
        
    }
    else if(command === 'image')
    {
        client.commands.get('image').execute(message, args, Discord); 
        
    }
    else if(command === 'play')
    {
        client.commands.get('play').execute(message, args, Discord, command, client); 
        
    }
    else if(command === 'skip')
    {
        client.commands.get('play').execute(message, args, Discord, command, client); 
        
    }
    else if(command === 'stop')
    {
        client.commands.get('play').execute(message, args, Discord, command, client); 
        
    } 
    else if (command === 'help')
    {
        client.commands.get('help').execute(message, Discord, client); 
    } 
    else if(command === 'suggest')
    {
        client.commands.get('suggest').execute(message, args, Discord, client ); 
    }
    
    
    
    

    
    




})





client.login('Your bot token');  //the token is like the bots fingerprint, it's unique to your bot and allows you to control it.
                                //the token must be kept secret as otherwise people could control your bot to. 