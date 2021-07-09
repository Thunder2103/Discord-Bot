
const ms = require('ms'); 
module.exports = {
    name: 'mute', 
    description: "stop people talking", 
    aliases: ['unmute'], //other names the command can go by, the mute and unmute commands have been kept together 
    execute(message, args, Discord, command, startTime, stopTime, timer) //parameters for the command to work 
    {
       
        var high = message.guild.roles.highest; //gets the highest role in the server
        var join = args.join(' '); //joins the users input together
        var str = join.toString(); //converts it too a string 
        var slash = str.slice(22); //removes the first 22 elememts (the usersID*) from str, stores result as 'slash' 
        slash = slash.slice(0, -1); //remove last element from 'slash'
        var entire = str.length;  //returns length of str and stores it as 'entire'
        var end = str[entire-1];  //return last element of str stores it as 'end'. 
        
        if (command === 'mute')
        { 
            if(isNaN(slash)) return message.reply('I am going to need a number followed by s/m/h'); //checks if 'slash' is a number, returns error if it isn;t
               
            if((end !== 's') && (end !== 'm') && (end !== 'h')) return message.reply('Without s/m/h muting would last for milliseconds!'); //checks if 'end' is s/m/h, return error if false
            //s - seconds, m - minutes, h - hours
            if(!message.member.roles.cache.find(r => r.id === (high.id)))  return message.reply('You do not have the permission!'); //checks is user has permissions, if not returns error message
            const target = message.mentions.users.first();  //the target is the person to be muted 
            console.log(target.id);
            if(!target) return message.reply('Can not find that person!'); //returns message if the person can't be found
                
            
            if(target)
            {
                if(target.id === message.author.id) return message.reply('You can not mute yourself!'); //makes sure the user can't mute themselves
                  
                
               
                
                
                
                var mute = message.guild.roles.cache.find(role => role.name === 'Mute'); //defines the mute role
                                                                                         //the mute role is a role with no permissions, whoever has this role can't message or speak. 
                
                if(!mute) return message.reply('Mute role can not be found!'); //returns error if mute role can't be found. 
                    
    
                
    
                var memTarget = message.guild.members.cache.get(target.id); //returns ID of the person we want to mute, the ID is a 22 digit number string, unique to each user. 
                
                
                if(memTarget.roles.cache.find(nomute => nomute.id === (high.id))) return message.reply('Owners can not be muted!');
                //if the target has the highest role in the server - they can't be muted. 
                
               
    
                if(!args[1]) return message.reply('The user can not be muted indefinitely'); 
                //if there are no arguements the user could be muted forever, this prevents that
                    
                
                
                userRoles = memTarget.roles.cache; //stores all the roles the target currently has
                memTarget.roles.set([]) //removes all the targets roles
                .then(member => member.roles.add(mute)).catch(console.error); //trys to add the mute role, if error, it is caught and logged in console
                
                message.reply(`<@${memTarget.user.id}> has been muted for ${ms(ms(args[1]))}`);  //message sent with the targets username and how long they have been muted
    
                startTime(memTarget, userRoles, args, message); //this function handles the timer, the timer is how long the target is muted for. the user is unmuted when the timer ends
            }                                                   // the function is found in the index.js file
            else
            {
                message.reply('Can not find the member!'); //returns message target can not be found 
            }; 

        } 
        if (command === 'unmute') //unmute command
        {
            const target = message.mentions.users.first(); //get the user we want to unmute
            if(target)
            {
                var mute = message.guild.roles.cache.find(role => role.name === 'Mute'); //redefines mute role 

                var memTarget = message.guild.members.cache.get(target.id); //get the ID of the target

        
                memTarget.roles.remove(mute.id); //remove mute role
                memTarget.roles.set(userRoles);  //readds all of the targets previous roles
                message.reply(`<@${memTarget.user.id}> has been unmuted`);  //sends a message confirming the unmute
                
        

                stopTime(timer); // function to cancel the timer
            }
            else
            {
                message.reply('Can not find the member!'); //displays message if user can't be found 
           
            }
        }
       
       
    
    
    
    
    
    
    
    
    
    
    }
}


