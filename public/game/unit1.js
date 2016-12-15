(function() {
		'use strict';
		//Витя пес
		const Sprite = window.Sprite;

		//это удар скелета
		const spriteSkeletonFight = new Sprite('Skeleton.gif', [0, 170], [60, 75], 0.003, [0, 1]);

		//симметричный удар скелета
		const spriteSkeletonFightReverse = new Sprite('SkeletonReverse.png', [380, 170], [60, 75], 0.003, [0, 1]);

		//это удар огра
		const spriteOgrFight = new Sprite('DnD-OgreLeader.png', [255, 950], [136, 92], 0.007, [5, 4, 0, 4, 5]);

		//симметричный удар огра
		const spriteOgrFightReverse = new Sprite('DnD-OgreLeaderReverse.png', [0, 950], [126, 92], 0.007, [5, 4, 0, 4, 5]);


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
				this.x = data.x || 270;
				this.y = data.y || 300;
				this.hp = data.hp || 10;
				this.counter = data.counter || 0;
				this.damage = data.damage || 50;
				this.poscoord = data.poscoord || -15;
				this.spriteType = data.spriteType || 1;
				this.spriteNeedChange = 0;
				this.stopped = false;
				this.onbattle = false;

				//это бег гладиатора
				//this.sprite = new Sprite('gladiator_arena_sprites.gif', [0, 220], [85, 60], 0.005, [0, 1, 2, 3, 4, 5]);

				//это бег скелета
				//this.sprite = new Sprite('Skeleton.gif', [0, 335], [55, 60], 0.005, [0, 1, 2]);

				if (this.spriteType === 1) {
					this.sprite = new Sprite('Skeleton.gif', [0, 335], [55, 60], 0.005, [0, 1, 2]);
				} else if (this.spriteType === 2) {
					this.sprite = new Sprite('DnD-OgreLeader.png', [318.4, 216], [96, 92], 0.007, [6, 5, 4, 3, 2, 1, 0]);
				} else if (this.spriteType === 3) {
					this.sprite = new Sprite('SkeletonReverse.png', [335, 335], [55, 60], 0.005, [2, 1, 0]);
				} else if (this.spriteType === 4) {
					this.sprite = new Sprite('DnD-OgreLeaderReverse.png', [34, 216], [96, 92], 0.007, [0, 1, 2, 3, 4, 5, 6]);;
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

			checkcollision({
				width,
				height
			}, action = 'reflect', poscoord) {
				let result = {};


				// if (this.x + 210 > width || this.x < 0) {
				// 	result.x = true;
				// 	this.vx = 0;
				// 	if (this.spriteNeedChange == 0) {
				// 		this.spriteNeedChange = 1;
				// 		if (this.spriteType == 1) {
				// 			this.sprite = spriteSkeletonFight;
				// 		} else {
				// 			this.sprite = spriteOgrFight;
				// 		}
				// 	}
				// 	//this.counter += dt;
				// 	this.stopped = true;

				// }


				if (this.spriteType == 1 || this.spriteType == 3) {
					if (this.x + 210 > width || this.x - 210 < 0) {
						result.x = true;
						this.vx = 0;
						if (this.spriteNeedChange == 0) {
							this.spriteNeedChange = 1;
							if (this.spriteType == 1) {
								this.sprite = new Sprite('Skeleton.gif', [0, 170], [60, 75], 0.003, [0, 1]);
							} else if (this.spriteType == 3) {
								this.sprite = new Sprite('SkeletonReverse.png', [380, 170], [60, 75], 0.003, [0, 1]);
							}
						}


						//this.counter += dt;
						this.stopped = true;

					}

				} else if ((this.spriteType == 2) || (this.spriteType == 4)) {
				if (this.x + 260 > width || this.x - 260 < 0) {
					result.x = true;
					this.vx = 0;
					if (this.spriteNeedChange == 0) {
						this.spriteNeedChange = 1;
						if (this.spriteType == 2) {
							this.sprite = new Sprite('DnD-OgreLeader.png', [255, 950], [136, 92], 0.007, [5, 4, 0, 4, 5]);
						} else if (this.spriteType == 4) {
							this.sprite = new Sprite('DnD-OgreLeaderReverse.png', [0, 950], [126, 92], 0.007, [5, 4, 0, 4, 5]);
						}
					}

					//this.counter += dt;
					this.stopped = true;

				}
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
			//console.log(this.damage);
			return this.damage;
		}


		get_spriteType() {
			return this.spriteType;
		}

		isStopped() {
			return this.stopped;
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
