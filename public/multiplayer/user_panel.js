(function () {
	'use strict';


	class mUser_panel {

		/**
		 * Конструктор класса Unit1
		 */
		constructor ({money = 100, counter = 0}) {
			this.money = money;
			this.counter = counter;
		}


		incrementCounter(dt) {
			this.counter += dt;
		}

		getCounter() {
			return this.counter;
		}

		nullCounter() {
			this.counter = 0;
		}


		losing_money(value){

			this.money -= value;
		}

		get_money(){
			return this.money;
		}

		increaseMoney(coins){
			this.money += coins;
		}

		draw (ctx) {
			ctx.beginPath();
			var canvas = document.getElementById("canvas");

			var image = new Image();
			image.src = "money.gif";
			ctx.drawImage(image, 50, 1, 30, 30);

			ctx.fillStyle = "#FFFF00";
			ctx.font = "italic 15pt Arial";
    		ctx.fillText(this.money, 80, 25);
			ctx.closePath();
		}

		draw_message(ctx){
			ctx.beginPath();
			var canvas = document.getElementById("canvas");
			ctx.fillStyle = " #FF0000";
			ctx.font = "italic 20pt FANTASY";
    		ctx.fillText("You don't have enough money", 450, 25);
			ctx.closePath();
		}



	}

	//export
	window.mUser_panel = mUser_panel;
})();
