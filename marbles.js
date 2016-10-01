var tmi = require('tmi.js');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


//Channel to join
channel = "marbleracing"

// Multiball enabled
var multiball = "false";

// No. of marbles to enter in multiball
var counter = 5;

// Time to wait before chatting
var minwait = 2000;
var maxwait = 5000;
var multitimeout = 2000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log(msg);
    client.say(channel, msg);
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


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
    channels: [channel]
};

var skins = [
    'jupiter',
    'moon',
    'tree',
    'planet',
    'imGlitch',
    'BibleThump',
    'earth',
    'mars',
    'neptune',
    'black',
    'safehouse',
    'pool1',
    'gold',
    'neonpink',
    'beachball',
    'pool8',
    'chaosred',
    'chaosblue',
    'chaosgreen',
    'chaosteal',
    'sun',
    'rock',
    'chaosyellow',
    'chaospurple',
    'mercury',
];

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function entermarble() {
    var randomNumber = Math.floor(Math.random()*skins.length);
    var str1 = "!marble ";
    var str2 = skins[randomNumber];
    var marble = str1.concat(str2);
    client.say(channel, marble);
}

function entermulti() {
    var randomNumber = Math.floor(Math.random()*skins.length);
    var str1 = ": !marble ";
    var str2 = skins[randomNumber];
    var marble = str1.concat(str2);

    client.say(channel , marble);
    counter--;
    if(counter > 0) {
        setTimeout(entermulti, multitimeout);
     }
}

var client = new tmi.client(options);
client.connect();


client.on('chat', function(channel, user, message, self) {
    io.emit('chat message', user['display-name'] + ": " + message);
    if(message === "Enter marbles now!") {
	    if(user['display-name'] === "MarbleRacing") {
	        if(multiball === "true") {
	 	    entermulti();
	        } else {
	              setTimeout(entermarble, getRandom(minwait, maxwait));
                }
	}
    }
});

client.on('connected', function(address, port) {
    console.log("Address " + address + " Port: " + port);
    console.log("Multiball enabled: "+ multiball)
    console.log("Multiball counter: " + counter)
    console.log("MultiTimeout: " + multitimeout)
   // console.log("General timeout: " + timeout)
});
