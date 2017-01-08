(function() {
	'use strict';

	const View = window.View;
	const Form = window.Form;
	const Tower_defence = window.Tower_defence;
	//const Router = window.Router;


	class gameView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.js-game');
			this.addListeners();
			this.hide();
			this.backGround = document.getElementsByClassName('bg');
			this.backGround[0].hidden = "hidden";

		}

		init(options = {}) {}

		_initCanvas() {
			this.canvas = this._el.querySelector('.js-canvas');
			this.canvas.width = this._el.clientWidth + '';
			this.canvas.height = this._el.clientHeight + '';
		}

		resume() {
			super.resume();
			this._initCanvas();

			this._game = new Tower_defence({
				ctx: this.canvas.getContext('2d'),
				width: +this.canvas.width,
				height: +this.canvas.height
			});

			this._game.start();
			window.isGame = true;
		}

		addListeners() {
			console.log(this.router);
			document.addEventListener("DOMContentLoaded", (event) => {
				console.log(this.router);
				window.gameRouter = this.router;
				console.log(window.gameRouter);
			});


		}
	}



	// export
	window.gameView = gameView;

})();
