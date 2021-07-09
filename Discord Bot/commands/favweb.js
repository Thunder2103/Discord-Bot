module.exports = {
    name: 'favweb', 
    description: "Learning how to use embeds", 
    execute(message, args, Discord){
        const status = new Discord.MessageEmbed()
        .setColor('#0000FF') 
        .setTitle('My favourite song!')
        .setURL('https://www.youtube.com/watch?v=pAgnJDJN4VA')
        .setDescription('This is why I like the song')
        .addFields(
            {name: 'reason 1:', value: 'The guitar is cool'},
            {name: 'reason 2:', value: 'I like it'},
            {name: 'reason 3:', value: "My dad first showed it too me"},
            {name: 'reason 4:', value: 'It is a good song to code to'}


        )
        .setImage('https://static.billboard.com/files/media/acdc-back-in-black-album-cover-650-compressed.jpg')
        .setFooter('Back in black album cover'); 
        
        message.channel.send(status); //sends the embed to the channel 
    }
}