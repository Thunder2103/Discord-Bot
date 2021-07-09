var Scraper = require('images-scraper'); //you need this for the code to work
const google = new Scraper( //Scraper that gets the images from gooogle 
    {   //parameters for the scraper 
        puppetter: 
        {
            headless: true
        }
    }); 

module.exports = {
    name: 'image', 
    description: "Returns an image", 
    async execute(message, args, Discord)
    {
        message.reply('Working on it...') 
        const image_query = args.join(' '); //joins together what the user types in 
        if(!image_query) return message.reply("Error, I need something to search"); 
        
        
        const image_results = await google.scrape(image_query, 20); //gives the parameters the user typed in, it returns the top 20 images
        var rand = Math.floor(Math.random() * 21); //we randomly generate a number between 1 and 20, this means we can return one of the 20 images
       // console.log(rand);
       if(!image_results) return  message.reply('Looks like something went terribly wrong!');
       message.reply(image_results[rand].url); //we send the image that has been selected, and it's URL, to the channel 
        
    }
}