(function () {
	'use strict';


	class User_panel {

		/**
		 * Конструктор класса Unit1
		 */
		constructor ({money = 100}) {
			this.money = money;
		}

		losing_money(value){

			this.money -= value;
		}

		get_money(){
			return this.money;
		}

		draw (ctx) {
			ctx.beginPath();
			var canvas = document.getElementById("canvas");
			
			var image = new Image();
			image.src = "money.gif";
			ctx.drawImage(image, 10, 1, 30, 30);

			ctx.fillStyle = "#FFFF00";
			ctx.font = "italic 15pt Arial";
    		ctx.fillText(this.money, 40, 25);
			ctx.closePath();
		}



	}

	//export
	window.User_panel = User_panel;
})();