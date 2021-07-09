module.exports = {
    name: 'suggest', 
    description: "Suggestions", 
    execute(message, args, Discord, client){
      
    
       const textChannel = message.guild.channels.cache.find(c => c.name === 'suggestions'); //channel where suggestions can be found. 
       if(!textChannel) return('The channel for suggestions does not exist!');  

       var messageArgs = args.join(' '); //creates embed
       const embed = new Discord.MessageEmbed()
       .setTitle('An Suggestion:')
       .setColor('#FF2D00') 
       .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true})) //sends user who suggested idea
       .setDescription(messageArgs) //returns the suggestion the user has given 
       .setImage('https://www.hjaltland.org.uk/site/assets/files/1235/suggestion-box-improve-business.jpg'); 

       textChannel.send(embed);   //sends embed to suggestions channel
       client.users.cache.get("Your Discord ID").send(embed); //sends suggestion to you. Your Discord ID is a 22 digit number unique to your account. 
       
       
     

    }
}