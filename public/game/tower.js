(function () {
	'use strict';

	class Tower {

		/**
		 * Конструктор класса Tower
		 */
		constructor ({x = 1100, y = 60, hp = 1000}) {
			this.x = x;
			this.y = y;
			this.hp = hp;
		}


		checkcollision ({width, height}, action = 'reflect', coord, damage, spriteType) {
			let result = {};	

				if(this.hp <= 0){
					this.hp = 0;
					result.x = false;
				}
				else if(spriteType === 1){
					if (coord + 210 > width || coord < 210) {
					result.x = true;	
					this.hp -= damage;	
					}
				}
				else {
					if (coord + 260 > width || coord < 260) {
						result.x = true;	
						this.hp -= damage;
					}
				}

			
			this[action](result);
		}

		getHp(){
			return this.hp;
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

			var image = new Image();
			image.src = "tower.png"; 

			ctx.drawImage(image, this.x, this.y, 180, 360);
			ctx.closePath();
		}

		draw_destroyed(ctx){
			var image = new Image();
			image.src = "destroyed.png"; 

			ctx.drawImage(image, this.x + 30, this.y, 150, 360);
			ctx.closePath();
		}

		drawHp(ctx){

			ctx.fillStyle = "red";
			ctx.fillRect(this.x + 40, this.y - 20, (this.hp / 10), 20);
		}





		
	}

	//export
	window.Tower = Tower;
})();
