(function () {
	'use strict';

	const View = window.View;
	const Form = window.Form;
	const pingPong = window.pingPong;

	class gameView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.js-game');
			this.hide();
		}

		init(options = {}) {}

		_initCanvas () {
			this.canvas = this._el.querySelector('.js-canvas');
			this.canvas.width = this._el.clientWidth + '';
			this.canvas.height = this._el.clientHeight + '';
		}

		resume () {
			super.resume();
			this._initCanvas();

			this._game = new pingPong({
				ctx: this.canvas.getContext('2d'),
				width: +this.canvas.width,
				height: +this.canvas.height
			});

			this._game.start();
		}
	}


	// export
	window.gameView = gameView;

})();