const fetch = require('node-fetch');

var jsonobj;
var urlstring


function getredditposts() {



    fetch('https://www.reddit.com/r/ich_iel/top/.json?limit=1', {
        method: 'GET'
    })
        .then(res => res.json())
        .then((json) => {
            jsonobj = json
            urlstring = jsonobj.data.children[0].data.url
        });

};

function printstring() {
    getredditposts();
    console.log(urlstring)

}


setInterval(printstring, 3000);

const { Client, MessageAttachment } = require('discord.js');
const client = new Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content === 'ich_iel') {
        // Create the attachment using MessageAttachment
        const attachment = new MessageAttachment(urlstring);
        // Send the attachment in the message channel
        message.channel.send(attachment);
    }
});

client.login('aQK8-fbczAVbRV3Rvq-BTdJGJyEN7G_q');