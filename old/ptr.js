var tmi = require('tmi.js');

var options = {
    options: {
        debug: true
    },
    connection: {
        cluster:"aws",
        reconnect: true
    },
    identity: {
        username: "bootyclub",
        password: "oauth:zv09ee3folsj1l9u9q8o7m8z1n6jd9"
    },
    channels: ["marblePTR"]
};

function entermarble() {
    var str1 = ": !marble ";
    var str2 = skins[randomnumber];
    var marble = str1.concat(str2);
    client.action("marblePTR" , marble);
}

var skins = [
    'blue',
    'pink',
    'darkred',
    'Kappa',
    'imGlitch',
    'BibleThump',
    'teal',
    'red',
    'green',
    'black',
];
var randomNumber = Math.floor(Math.random()*skins.length);

function entermulti() {
    var str1 = ": !marble ";
    var str2 = skins[randomnumber];
    var marble = str1.concat(str2);

    client.action("marblePTR" , marble);
    counter--;
    if(counter > 0) {
        setTimeout(entermulti, timeout);
     }
}


// 1 for true, 0 for false
var multiball = "true";

// No. of marbles to enter in multiball
var counter = 5;
var timeout = 5000;

var client = new tmi.client(options);
client.connect();

client.on('chat', function(channel, user, message, self) {
    if(message === "Enter marbles now!") {
	if(user['display-name'] === "MarbleRacing") {
	    if(multiball === "true") {
	 	    entermulti();
	    } else {
	          setTimeout(entermarble, timeout);
            }
	}
    }
});

client.on('connected', function(address, port) {
    console.log("Address " + address + " Port: " + port);
});
