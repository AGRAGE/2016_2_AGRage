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

		draw (ctx) {
			ctx.beginPath();
			var canvas = document.getElementById("canvas");
			
			var image = new Image();
			image.src = "money.gif";
			ctx.drawImage(image, 10, 3, 40, 40);

			ctx.fillStyle = "#FFFF00";
			ctx.font = "italic 20pt Arial";
    		ctx.fillText(this.money, 55, 35);
			ctx.closePath();
		}

		// going(){
		// 	this.x += 1;
		// }

	}

	//export
	window.User_panel = User_panel;
})();