module.exports = {
    name: 'clear', 
    description: "this will clear messages less than 14 days old", 
    async execute(message, args, Discord){ //async is put at the beginning so we can use await
       if(!args[0]) return message.reply("Please enter a number to tell me how many messages to delete!"); //error checks 
       else if(isNaN(args[0])) return message.reply('Error, please enter a number');

       else if(args[0] > 100) return message.reply('I can not delete more than 100 messages'); //the bot can delete a maximum of 100 messages, this can be decreased or increased

       else if(args[0] < 1) return message.reply('Error, a decimal, zero or negative number has been entered');

       else
       {                                                                            
           await message.channel.messages.fetch({limit: args[0]}).then(messages => //the await function means a promise is returned rather than a value
            {                                                                      //a promise is either pending, fulfilled or rejected. 
                                                                                   //the bot gets the amount of messages we want to delete 
                
                message.channel.bulkDelete(messages, true) //the promise in this case is trying to delete the messages 
                .then(deletedMessages =>                   //.then is used to handled rejected promises
                                                           //here some of the messages are more than 14 days old which the bot can't delete 
                    {
                        messages = messages.filter(val => 
                            {
                                !deletedMessages.array().includes(val); //those messages are filtered out
                            }); 
                        if(messages.size > 0)
                        {
                            messages.deleteAll(); //we delete the remaining messages
                        }
                    }) 
                    .catch(function(error) {       //the .catch handles error if we can't filter the messages 
                            console.log('Error'); 
                            throw(error); 
                    });
                
            }); 
               
                
            
          

        }
           


       
    }
}