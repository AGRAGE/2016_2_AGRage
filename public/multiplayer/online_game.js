(function() {
	'use strict';
	const Unit1 = window.Unit1;
	const keyMaster = window.keyMaster;
	const Tower = window.Tower;
	const GameButton = window.GameButton;
	const User_panel = window.User_panel;
	const Bot = window.Bot;
	const Router = window.Router;
	const View = window.View;

	const MessagingTools = window.MessagingTools;
	const GameSocket = window.GameSocket;

	// const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
	// const address = `${protocol}//${location.host}/api/game`;

	class TD_online {

	  	constructor(options) {

            let socket = new GameSocket();
            this.messaging = socket.getMessaging();


	  	}

	  	start(){
	  		let tower = {};
	  		tower.Id = 1;
	  		tower.Health = 1000;
	  		console.log(this.messaging);
	  		this.messaging.TowerHpMessage(tower);
	  	}
	}


 

		
	//export
	window.TD_online = TD_online;
})();
