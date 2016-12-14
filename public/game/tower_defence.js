(function() {
	'use strict';

	const Unit1 = window.Unit1;
	const keyMaster = window.keyMaster;
	const Tower = window.Tower;
	const GameButton = window.GameButton;

	class Tower_defence {

		/**
		 * Конструктор 
		 */
		constructor({
			ctx,
			width,
			height
		}) {
			this.ctx = ctx;
			this.width = width;
			this.height = height;

			this.unit1 = new Unit1({});

			this.counter = 1;
			this.units = [];
			this.units[0] = new Unit1({});
			this.tower = new Tower({});
			this.readyToShot = true;
			this.key = new keyMaster();

			this._el = document.querySelector('.js-main');
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

			// this.bullets.forEach(bullet => {
			// 	bullet.update(dt);
			// 	bullet.checkRectangleIntersection({
			// 		width: this.width,
			// 		height: this.height
			// 	}, 'destroy');

			// 	bullet.draw(this.ctx);
			// });

			this.tower.incrementCounter(dt);

			this.units.forEach(unit => {
				unit.sprite.update(dt);
			});
			//this.unit1.update(dt);
			//this.unit1.sprite.update(dt);

			//this.checkControl();

			//var i;
			//for (i = 0; i < this.counter; i++) {
			this.units.forEach(unit => {
				//alert(this.units[i]);
				//console.log[(this.units[i]);
				unit.checkRectangleIntersection({
					width: this.width,
					height: this.height
				}, 'reflect');


				this.tower.checkRectangleIntersection({
					width: this.width,
					height: this.height
				}, 'reflect', unit.coordinate());
				//this.unit1.coordinate());

				unit.going();


				//this.unit1.draw(this.ctx);
				unit.draw(this.ctx);
				this.tower.draw(this.ctx);
				this.tower.drawHp(this.ctx);

				//this.collectGarbage();
			})
		};

		collectGarbage() {
			this.bullets.forEach((bullet, index, arr) => {
				if (bullet.toDestroy) {
					arr.splice(index, 1);
				}
			});
		}

		// createBullet () {
		// 	if (!this.readyToShot) {
		// 		return;
		// 	}

		// 	this.readyToShot = false;
		// 	this.bullets.push(new Unit1({
		// 		color: '#' + technolibs.colorHash('bullet' + Date.now()),
		// 		r: 10,
		// 		x: this.unit1.x,
		// 		y: this.unit1.y,
		// 		vx: this.unit1.vx * 5,
		// 		vy: this.unit1.vy * 5
		// 	}));

		// 	setTimeout(() => this.readyToShot = true, 300);
		// }

		/*checkControl() {
			if (this.key.is('w')) {
				this.units[0].dv({
					vy: -0.01
				});
			}

			if (this.key.is('s')) {
				this.units[0].dv({
					vy: 0.01
				});
			}

			if (this.key.is('d')) {
				this.units[0].dv({
					vx: 0.01
				});
			}

			if (this.key.is('a')) {
				this.units[0].dv({
					vx: -0.01
				});
			}

			// if (this.key.is(' ')) {
			// 	this.createBullet();
			// }
		}*/



		createElements() {
			this.buttonLogin = new GameButton({
				el: document.createElement('game_button'),
				classAttrs: ['HiringButton'],
				text: 'Нанять unit1',

			});

			this.buttonRegister = new GameButton({
				el: document.createElement('game_button'),
				classAttrs: ['LoginButton'],
				text: 'Нанять unit2',
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
				this.units[this.units.length] = new Unit1({});
			});
			this.buttonRegister._get().addEventListener('click', (event) => {
				//this.units[this.counter] = new Unit1({});
				//this.counter++;
				this.units[this.units.length] = new Unit1({});
			});
		}
	}

	//export
	window.Tower_defence = Tower_defence;
})();
