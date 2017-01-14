(function() {
	'use strict';
	const mUnit1 = window.mUnit1;
	const mkeyMaster = window.mkeyMaster;
	const mTower = window.mTower;
	const GameButton = window.GameButton;
	const mUser_panel = window.mUser_panel;
	const mBot = window.mBot;
	const Router = window.Router;
	const View = window.View;

	const MessagingTools = window.MessagingTools;
	const GameSocket = window.GameSocket;

	// const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
	// const address = `${protocol}//${location.host}/api/game`;

	class TD_online {

		constructor(options) {

			let socket = new GameSocket();
			//this.messaging = socket.getMessaging();


		}

		start() {
			let tower = {};
			tower.Id = 1;
			tower.Health = 1000;
			//this.messaging.TowerHpMessage(tower);
		}

		startLoop() {
			let time,
				isStopped = this.isStopped.bind(this),
				exec = this.exec.bind(this);

			function step() {
				var now = Date.now(),
					dt = now - (time || now);

				time = now;

				if (!isStopped()) {
					requestAnimationFrame(step);
					exec(dt);
				} else {

					// console.log(window.gameRouter);
					// window.gameRouter.go('/menu/');

					//window.gameRouter.go('/menu/');
					new Router().go('/menu');


					//this.router.go('/menu/');

				}

			}
			step();
		}

	}





	//export
	window.TD_online = TD_online;
})();
