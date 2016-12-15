(function() {
	'use strict';

	const Sprite = window.Sprite;

	//это удар скелета
	const spriteSkeletonFight = new Sprite('Skeleton.gif', [0, 170], [60, 75], 0.003, [0, 1]);

	//это удар
	const spriteOgrFight = new Sprite('DnD-OgreLeader.png', [255, 950], [170 * 0.8, 115 * 0.8], 0.007, [5, 4, 3, 2, 1, 0, 3, 4, 5]);
	class Unit1 {
		/**
		 * Конструктор класса Unit1
		 */
		constructor(data = {}
			/*{
						x = 100,
						y = 300,
						vx = 0.1,
						hp = 10,
						damage = 50,
						counter = 0,
						poscoord = -15,
						spriteType = 1
						*
					}*/
		) {
			this.vx = data.vx || 0.1;
			this.x = data.x || 100;
			this.y = data.y || 300;
			this.hp = data.hp || 10;
			this.counter = data.counter || 0;
			this.damage = data.damage || 50;
			this.poscoord = data.poscoord || -15;
			this.spriteType = data.spriteType || 1;
			this.spriteNeedChange = 0;
			//это бег гладиатора
			//this.sprite = new Sprite('gladiator_arena_sprites.gif', [0, 220], [85, 60], 0.005, [0, 1, 2, 3, 4, 5]);

			//это бег скелета
			//this.sprite = new Sprite('Skeleton.gif', [0, 335], [55, 60], 0.005, [0, 1, 2]);

			if (this.spriteType === 1) {
				this.sprite = new Sprite('Skeleton.gif', [0, 335], [55, 60], 0.005, [0, 1, 2]);
			} else {
				this.sprite = new Sprite('DnD-OgreLeader.png', [398 * 0.8, 270 * 0.8], [120 * 0.8, 115 * 0.8], 0.007, [6, 5, 4, 3, 2, 1, 0]);
			}


		}

		// dv ({vx = 0}) {
		// 	this.vx += vx;
		// 	//this.vy += vy;
		// }

		incrementCounter(dt) {
			this.counter += dt;
		}

		getCounter() {
			return this.counter;
		}

		nullCounter() {
			this.counter = 0;
		}
		update(dt) {
			this.x += this.vx * dt;
			//this.y += this.vy * dt;
		}

		checkRectangleIntersection({
			width,
			height
		}, action = 'reflect', dt) {
			let result = {};
			if (this.x + 280 > width || this.x < 0) {
				result.x = true;
				this.vx = 0;
				if (this.spriteNeedChange == 0) {
					this.spriteNeedChange = 1;
					//this.sprite = spriteSkeletonFight;
					if (this.spriteType == 1) {
						this.sprite = spriteSkeletonFight;
					} else {
						this.sprite = spriteOgrFight;
					}
				}
				this.counter += dt;
			}
			this[action](result);
		}

		coordinate() {
			return this.x;
		}

		getHp() {
			return this.hp;
		}

		drawHp(ctx) {

			ctx.fillStyle = "red";
			ctx.fillRect((this.x + 10), (this.y - 5), (this.hp * 4), 3);
		}

		destroy(axis) {
			if (axis.x || axis.y) {
				this.toDestroy = true;
			}
		}

		get_damage() {
			return this.damage;
		}

		reflect(axis) {
			Object.keys(axis).forEach(dem => {
				if (axis[dem]) {
					this[`v${dem}`] *= -1;
				}
			})
		}

		draw(ctx) {
			ctx.beginPath();
			//var canvas = document.getElementById("canvas");
			//var image = document.getElementById("unit1.png");
			//var image = new Image();
			//image.src = "unit1.png";

			this.sprite.render(ctx, this.x, this.y);
			//ctx.drawImage(image, this.x, this.y, 100, 100);
			ctx.closePath();
		}

		// going(){
		// 	this.x += 1;
		// }

	}

	//export
	window.Unit1 = Unit1;
})();
