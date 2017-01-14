(function () {
	'use strict';

	const Block = window.Block;

	class GameButton extends Block {
		constructor(options) {
			super('game_button', options);
			this._el.classList.add('game_button');
			this._el.innerText = this._options.text || 'Press me';
		}
	}

	//export
	window.GameButton = GameButton;

})();
