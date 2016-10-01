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
    channels: ["marbleracing"]
};

function entermarble() {
        client.action("marbleracing" ,": !marble");
}


var client = new tmi.client(options);
client.connect();

client.on('chat', function(channel, user, message, self) {
    if(message === "Enter marbles now!") {
	if(user['display-name'] === "MarbleRacing") {
	 setTimeout(entermarble, 800);
	}
    }
});

client.on('connected', function(address, port) {
    console.log("Address " + address + " Port: " + port);
});
