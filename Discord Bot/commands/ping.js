module.exports = {
    name: 'ping', 
    description: "a test command, just outputs pong!", 
    execute(message, args, Discord){
       message.reply('Pong!'); 
    }
}