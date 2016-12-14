(function () {
	'use strict';

	const Sprite = window.Sprite;

	class Unit1 {

		/**
		 * Конструктор класса Unit1
		 */
		constructor ({x = 100, y = 300, vx = 0.1, hp = 10}) {
			this.vx = vx;
			this.x = x;
			this.y = y;
			this.hp = hp;
			//this.sprite = new Sprite('gladiator_arena_sprites.gif', [0, 220], [85, 60], 0.005, [0, 1, 2, 3, 4, 5]);
			this.sprite = new Sprite('Skeleton.gif', [0, 335], [55, 60], 0.005, [0, 1, 2]);
		}

		// dv ({vx = 0}) {
		// 	this.vx += vx;
		// 	//this.vy += vy;
		// }

		update (dt) {
			this.x += this.vx * dt;
			//this.y += this.vy * dt;
		}

		checkRectangleIntersection ({width, height}, action = 'reflect') {
			let result = {};
			if (this.x + 280 > width || this.x < 0) {
				result.x = true;
				this.vx = 0;
			}

			this[action](result);
		}

		coordinate (){
			return this.x;
		}

		getHp(){
			return this.hp;
		}

		drawHp(ctx){

			ctx.fillStyle = "red";
			ctx.fillRect((this.x + 10), (this.y - 5), (this.hp * 4), 3);
		}

		destroy (axis) {
			if (axis.x || axis.y) {
				this.toDestroy = true;
			}
		}

		reflect (axis) {
			Object.keys(axis).forEach(dem => {
				if (axis[dem]) {
					this[`v${dem}`] *= -1;
				}
			})
		}

		draw (ctx) {
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
