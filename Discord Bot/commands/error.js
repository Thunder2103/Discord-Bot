module.exports = {
    name: 'error', //used if a command doesn't work but the bot is still running
    description: "This will diplay an error message", 
    execute(message, args, Discord){
       message.reply('For whatever reason this command will not work!'); 
    }
}