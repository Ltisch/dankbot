const fetch = require('node-fetch');
const { Client, MessageAttachment } = require('discord.js');
const client = new Client();


var jsonobj;
var urlarray = [];
var globalindex;
var memechannel

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
    setTimeout(getredditposts, 1000 * 60 * 60)
};

function sendmeme(i) {
    var meme = new MessageAttachment(urlarray[globalindex])
    if (memechannel != null) {
        memechannel.send(meme)
        globalindex++
    }
}


client.on('ready', () => {
    console.log('I am ready!');
    getredditposts();

});


function call() {
    sendmeme(globalindex);
    setTimeout(call, 1000 * 60 * 2);
}

client.on('message', message => {
    if (message.content === 'ich_iel') {
        const attachment = new MessageAttachment(urlarray[globalindex]);
        memechannel = message.channel
        call();

    }
});

client.login('NzIwNjAzNjQwODEzMDYwMjA2.XuyBxg.STCeaaLmKEZfgIilQg7waUQb3fU');