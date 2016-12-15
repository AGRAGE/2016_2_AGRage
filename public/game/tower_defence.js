(function() {
	'use strict';
	//Витя по-умолчанию пес
	const Unit1 = window.Unit1;
	const keyMaster = window.keyMaster;
	const Tower = window.Tower;
	const GameButton = window.GameButton;
	const User_panel = window.User_panel;
	const Bot = window.Bot;

	class Tower_defence {

		/**
		 * Конструктор
		 */
		constructor({ctx, width, height, poscoord = 0}) {
			this.ctx = ctx;
			this.width = width;
			this.height = height;

			this.user_panel = new User_panel({});
			//this.unit1 = new Unit1({});

			this.bot = new Bot({});

			//this.counter = 1;

			this.bot_units = [];
			this.units = [];
			//this.units[0] = new Unit1({});
			this.tower = new Tower({
				x:0,
				y:60,
				hp:1000});

			this.bot_tower = new Tower({
				x:1100,
				y:60,
				hp:1000});


			this.readyToShot = true;
			this.key = new keyMaster();

			this.poscoord = poscoord;

			this._el = document.querySelector('.js-game');
			this.createElements();
			this.addElements();
			this.addListeners();
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
				}
				//console.log(dt);
				exec(dt);
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
			let keys = this.keys;
			this.clear();


			this.bot.incrementCounter(dt);

			if(this.bot.getCounter() > 2000){
				var i = this.bot.command();
				if(i === 1){
					if(this.bot.get_money() >= 10){
						this.bot_units[this.bot_units.length] = new Unit1({
							vx: -0.1,
							x: 1000,
							damage: 50,
							spriteType: 1
						});
						this.bot.losing_money(10);
					}
				}
				else{
					if(this.bot.get_money() >= 20){
						this.bot_units[this.bot_units.length] = new Unit1({
							vx: -0.1,
							x: 1000,
							damage: 100,
							spriteType: 2
						});
						this.bot.losing_money(20);
					}
				}

				console.log(this.bot.get_money());

				this.bot.nullCounter();
			}

			this.bot_units.forEach(unit => {
				//console.log(unit);
				unit.update(dt);
				unit.sprite.update(dt);
				unit.incrementCounter(dt);

			});


			this.bot_units.forEach(unit => {


				if(unit.isStopped() === false){
					unit.checkcollision({
						width: this.width,
						height: this.height
					}, 'reflect', dt);

				}

				if(unit.getCounter() > 2000){
					//console.log(unit.get_damage());
					this.tower.checkcollision({
						width: this.width,
						height: this.height
					}, 'reflect', unit.coordinate(), unit.get_damage(), unit.get_spriteType());

					unit.nullCounter();
				}

				//this.unit1.coordinate());

				//unit.going();


				//this.unit1.draw(this.ctx);
				unit.draw(this.ctx);
				unit.drawHp(this.ctx);
			})





			this.units.forEach(unit => {
				//console.log(unit);
				unit.update(dt);
				unit.sprite.update(dt);
				unit.incrementCounter(dt);

			});

			this.units.forEach(unit => {


				if(unit.isStopped() === false){
					unit.checkcollision({
						width: this.width,
						height: this.height
					}, 'reflect', dt);
					// if(unit.isStopped() === true){
					// 	if(this.poscoord != 100){
					// 		unit.change_y(this.poscoord);
					// 		this.poscoord += 10;
					// 		if(this.poscoord % 20 === 0){
					// 			unit.change_x(30);
					// 		}
					// 		//console.log();
					// 	}
					// 	else{
					// 		this.poscoord = 0;
					// 		unit.change_y(this.poscoord);
					// 	}

					// }

				}

				if(unit.getCounter() > 2000){
					//console.log(unit.get_damage());
					this.bot_tower.checkcollision({
						width: this.width,
						height: this.height
					}, 'reflect', unit.coordinate(), unit.get_damage(), unit.get_spriteType());

					unit.nullCounter();
				}

				//this.unit1.coordinate());

				//unit.going();


				//this.unit1.draw(this.ctx);
				unit.draw(this.ctx);
				unit.drawHp(this.ctx);
			})

				if (this.tower.getHp() > 0)
					this.tower.draw(this.ctx);
				else
					this.tower.draw_destroyed(this.ctx);
				this.tower.drawHp(this.ctx);

				if (this.bot_tower.getHp() > 0)
					this.bot_tower.draw(this.ctx);
				else
					this.bot_tower.draw_destroyed(this.ctx);
				this.bot_tower.drawHp(this.ctx);

				this.user_panel.draw(this.ctx);
				//this.collectGarbage();

		};

		createElements() {
			this.buttonLogin = new GameButton({
				el: document.createElement('game_button'),
				classAttrs: ['HiringButton1'],
				text: ' ',

			});

			this.buttonRegister = new GameButton({
				el: document.createElement('game_button'),
				classAttrs: ['HiringButton2'],
				text: ' ',
			});
		}

		addElements() {
			this._el.appendChild(this.buttonLogin._get());
			this._el.appendChild(this.buttonRegister._get());
		}

		addListeners() {
			this.buttonLogin._get().addEventListener('click', (event) => {
				//this.units[this.counter] = new Unit1({});
				//this.counter++;
				if(this.user_panel.get_money() < 10){
					alert("You don't have enough money");
				}
				else{

					this.user_panel.losing_money(10);
					this.units[this.units.length] = new Unit1({
						damage: 50,
						spriteType: 1
					});
				}


			});
			this.buttonRegister._get().addEventListener('click', (event) => {
				//this.units[this.counter] = new Unit1({});
				//this.counter++;
				if(this.user_panel.get_money() < 20){
					alert("You don't have enough money");
				}
				else{

					this.user_panel.losing_money(20);
					this.units[this.units.length] = new Unit1({
						damage: 100,
						spriteType: 2
					});
				}



			});
		}
	}

	//export
	window.Tower_defence = Tower_defence;
})();
