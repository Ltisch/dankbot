const fetch = require('node-fetch');
const { Client, MessageAttachment, Message } = require('discord.js');
const client = new Client();
var spam = true;
var jsonobj;
var urlarray = [];
var globalindex;
var memechannel
var min = 8
const dotenv = require('dotenv');
dotenv.config();
var to;

function getredditposts() {
    fetch('https://www.reddit.com/r/dankmemes/rising/.json?limit=30', {
        method: 'GET'
    })
        .then(res => res.json())
        .then((json) => {
            jsonobj = json
            for (let i = 0; i <= 29; i++) {
                urlarray[i] = jsonobj.data.children[i].data.url
            }
        });

    globalindex = 0
};


function sendmeme(i) {
    var meme = new MessageAttachment(urlarray[globalindex])
    if (memechannel != null) {
        memechannel.send(meme)
        globalindex++

        if (globalindex == 29) {
            getredditposts()
        }
    }
}


client.on('ready', () => {
    console.log('I am ready!');
    getredditposts();

});


function call() {
    sendmeme(globalindex);
    to = setTimeout(call, 1000 * 60 * min);
}

client.on('message', message => {
    if (message.content === 'spam here') {
        const attachment = new MessageAttachment(urlarray[globalindex]);
        memechannel = message.channel
        if (spam) {
            call();
            message.channel.send('I spam')
            spam = false

        } else {
            const bonk = new MessageAttachment('https://i.kym-cdn.com/entries/icons/original/000/033/758/Screen_Shot_2020-04-28_at_12.21.48_PM.png')
            message.channel.send(bonk)
        }
    }
});

client.on('message', message => {
    if (message.content === 'end spam') {
        spam = true
        clearTimeout(to);
        message.channel.send('I do the stop')
    }
});

// client.on('message', message => {
//     if (message.content === 'spam intervall') {

//     }
// });

client.login(process.env.API_KEY);