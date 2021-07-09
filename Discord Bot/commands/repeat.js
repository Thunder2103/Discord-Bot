module.exports = {
    name: 'repeat', 
    description: "repeat after me", 
    execute(message, args, Discord, prefix){
       var input = args.join(' '); //stores user input and stores it as variable 'input' 
       var str = input.toString(); //converts input to string
       var lower = str.toLowerCase(); //stores input as lower case
       if((lower.includes('i am an idiot')) || (lower.includes("i'm an idiot"))) 
        {
            message.reply('No, you are an idiot');
        }
       else if((lower.includes('i am stupid')) || (lower.includes("i'm stupid")))
        {
            message.reply('No , you are stupid')
            

        }

        
       else
        {
            var repeat = str.substring(); 
            message.reply(repeat); //repeats what user inputted. 

        }
       
    }
}