(function () {
	'use strict';

	const Unit1 = window.Unit1;
	const Tower = window.Tower;


	class Bot {

		constructor ({min = 1, max = 2, counter = 0, money = 100}) {
			this.min = min;
			this.max = max;
			this.counter = counter;
			this.money = money;
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

		command(){
			return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;

		}

		losing_money(value){

			this.money -= value;
		}

		get_money(){
			return this.money;
		}

		increaseMoney(coins){
			this.money += coins;
			console.log(coins);
		}
	}






	//export
	window.Bot = Bot;
})();
