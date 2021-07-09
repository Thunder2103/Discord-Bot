const ytdl = require('ytdl-core'); //dependecies, you will also need FFMPEG
const ytSearch = require('yt-search'); 
const queue = new Map(); //Holds key-value pairs. Maps remeber the orginal insertion order of the keys, good for storing songs in a queue
module.exports = {
    name: 'play', 
    description: "play some musci from music", 
    aliases: ['skip', 'stop'], //skip and stops commands are also stored here
    async execute(message, args, Discord, command, client)
    {
    
       let thumbnail; //these variables store info about the YouTube video like the thumbnail, who uploaded it and the runtime
       let time; 
       let vidMaker;  
       const Vc = message.member.voice.channel; //store the voice channel the user is in 
       
       if(!Vc)
       {
           message.reply('You need to be in a Voice Channel'); //returns error message if the user is not in a voice channel. 
           return; 
       }
       const permissions = Vc.permissionsFor(message.client.user); 
       if(!permissions.has('CONNECT')) return message.reply('I do not have the right permissions'); //if the bot doesn't have these permissions it can't play music, returns error message.
       if(!permissions.has('SPEAK')) return message.reply('I do not have the right permissions');
      
       const server_queue = queue.get(message.guild.id); //queues for different servers. 
       
       if(command === 'play') 
       {
            if(!args.length) return message.reply('Please enter something to play'); //if the user doesn't input anything to play, error message sent
            let song = {};  //variable to store song
            if(ytdl.validateURL(args[0])) //checks if input is a URL
            {
                const song_info = await ytdl.getInfo(args[0]); //gets video from URL
               
                song = {title: song_info.videoDetails.title, url: song_info.videoDetails.video_url}  //parameters to contruct song details. 
            } 
            else
            {   
                const vidFinder = async (query) => //function to find video
                {
                    const VidResult = await ytSearch(query); //sends a query with search parameters. e.g. User wants: ready to go paper kings 
                    return(VidResult.videos.length > 1) ? VidResult.videos[0]: null; //returns first video from search result of ready to go paper kings.  
                } 
                const video = await vidFinder(args.join(' ')); //joins user input together and gives it to vidFinder() function.
                if(video) //if video found                    //e.g //play ready to go paper kings. //play is ignored, the rest is joined together  
                {
                    song = {title: video.title, url: video.url} //parameters to consruct song details
                    thumbnail = video.thumbnail;  //gets video thumbnail, runtime and video uploader and stores it. 
                    time = video.duration;  
                    vidMaker = video.author.name; 
                    
                   
                   
            
                  

                } 
                else
                {
                    message.reply('Error finding what you wanted.'); //displays message if no videos can't be found
                }
            }  
            const musicEmbed = new Discord.MessageEmbed() //creates an embed
            .setColor('#006400')
            .setTitle(`Song: ***${song.title}***`) //video title
            .setImage(thumbnail) //video thumbnail
            .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true})) //displays the user that requested the song
            .addField('Length:', time, true) //sends video length
            .addField('Video Uploader:' , vidMaker, true);  //video uploader
            message.channel.send(musicEmbed); //sends embed to channel. 
  
            if(!server_queue) //if there is no server queue, one is created. 
            {
                const queue_construct = 
                {
                    Vc: Vc,
                    text_channel: message.channel, 
                    connection: null, 
                    songs: [],
                    

                };
                
                queue.set(message.guild.id, queue_construct); //makes a new queue for the server
                queue_construct.songs.push(song); //pushes song onto queue Map. 
              
                
                
                
               
              
                

                try
                {
                    //trys to join VC and make connection
                    const connection = await Vc.join(); 
                    queue_construct.connection = connection; 
                    video_player(message.guild, queue_construct.songs[0]);  //function to play videos
                    
                    
                    
                } 
                catch(err) //catches error 
                {
                    queue.delete(message.guild.id); //deletes queue
                    message.channel.send('There was an error connecting'); //sends error message
                    throw err;
                }
            }
            else
            {
                server_queue.songs.push(song); //adds song to queue to be played later
                return message.reply(`***${song.title}*** added to queue! Unfortunately`); 
            }  
            
            
        } 
        else if (command === 'skip') skip_song(message, server_queue); //skip current song
        else if (command === 'stop') stop_song(message, server_queue);  //sopt bot from playing music. 
        client.on('voiceStateUpdate', (oldState, newState) => {
            // check if someone connects or disconnects
            if (oldState.channelID === null || typeof oldState.channelID == 'undefined') return;
            // check if the bot is disconnected
            if (newState.id !== client.user.id) return; 
            // clear the queue
            queue.delete(oldState.guild.id);
           // console.log(queue);
            
        });  
       
        
        
        
       
    }



       
} 

const video_player = async (guild, song) => //play videos function 
{
    
    const song_queue = queue.get(guild.id); //get servers queue 
    if(!song)
    {
        song_queue.Vc.leave(); //if the song has ended and there is no more in the queue it leaves
        queue.delete(guild.id); 
        return; 
    } 
    const stream = ytdl(song.url, {filter: 'audioonly', highWaterMark: 1<<25}); //downloads song from youtube and plays it. highWaterMark sets download rate. 
    song_queue.connection.play(stream, {seek: 0, volume: 1})
    .on ('finish', () => 
    {
        song_queue.songs.shift(); //if song has ended and there is a song in the queue, the queue shifts to the next song. 
        video_player(guild, song_queue.songs[0]); 
    }); 
    
  
   await song_queue.text_channel.send(`Now Playing ***${song.title}***`);   //sends message confirming what song is playing 

     
    
} 

const skip_song = (message, server_queue) =>
{
    if(!message.member.voice.channel) return message.reply('You need to be in a voice channel.'); 
    if(!server_queue)
    {
        return message.channel.send('No songs in the queue.'); 
    } 
    server_queue.connection.dispatcher.end(); //stops song download, new song begins. 
}

const stop_song =(message, server_queue) =>
{
    if(!message.member.voice.channel) return message.reply('Ypu need to be in a voice channel.');
    server_queue.songs = []; //clears song queue
    server_queue.connection.dispatcher.end(); //stops song download. 

} 

