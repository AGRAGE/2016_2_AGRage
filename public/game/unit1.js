
(function () {
	'use strict';

	class Unit1 {

		/**
		 * Конструктор класса Unit1
		 */
		constructor ({x = 100, y = 300, vx = 0}) {
			this.vx = vx;
			this.x = x;
			this.y = y;
		}

		dv ({vx = 0}) {
			this.vx += vx;
			//this.vy += vy;
		}

		update (dt) {
			this.x += this.vx * dt;
			//this.y += this.vy * dt;
		}

		checkRectangleIntersection ({width, height}, action = 'reflect') {
			let result = {};
			if (this.x + 280 > width || this.x < 0) {
				result.x = true;			}

			this[action](result);
		} 

		coordinate (){
			return this.x;
		}

		destroy (axis) {
			if (axis.x || axis.y) {
				this.toDestroy = true;
			}
		}

		reflect (axis) {
			Object.keys(axis).forEach(dem => {
				if (axis[dem]) {
					this[`v${dem}`] *= 0;
				}
			})
		}

		draw (ctx) {
			ctx.beginPath();
			/* ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
			ctx.fillStyle = this.color;
			ctx.fill();
			ctx.closePath(); */

			//var canvas = document.getElementById("canvas");
			//var image = document.getElementById("unit1.png");
			var image = new Image();
			image.src = "unit1.png"; 

			ctx.drawImage(image, this.x, this.y, 100, 100);
			ctx.closePath();
		}


	}

	//export
	window.Unit1 = Unit1;
})();
