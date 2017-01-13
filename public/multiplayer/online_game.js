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


	class TD_online {

		/**
		 * Конструктор
		 */
		constructor({
			ctx,
			width,
			height,
			poscoord = 0
		}) {
			this.isGame = true;
			this.ctx = ctx;
			this.width = width;
			this.height = height;
			this.user_panel = new User_panel({});
			this.bot = new Bot({});

			//this.counter = 1;

			this.bot_units = [];
			this.units = [];
			//this.units[0] = new Unit1({});
			this.tower = new Tower({
				x: 0,
				y: 60,
				hp: 1000
			});

			this.bot_tower = new Tower({
				x: 1100,
				y: 60,
				hp: 1000
			});


			this.readyToShot = true;
			this.key = new keyMaster();

			this.poscoord = poscoord;

			this._el = document.querySelector('.js-game');

			this.battle_number = 1;

			this.counter = 0;

			this.poverty = false;

			this.end = false;

			this.give_up =false;
		}

		/**
		 * Начало новой игры
		 */



		start() {
			this._stopped = false;
			this.key.init();
			this.startLoop();
		}

		isStopped() {
			return this._stopped;
		}

		/**
		 * Начинаем крутить петлю
		 */
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

		clear() {
			this.ctx.clearRect(0, 0, this.width, this.height);
		}

		/**
		 * Обрабатываем текущий момент
		 * @param  {number} dt
		 */
		exec(dt) {


			this.collectGarbage();

		};




	//export
	window.TD_online = TD_online;
})();
