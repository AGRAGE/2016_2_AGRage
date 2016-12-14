(function () {
	'use strict';

	const Buttons = window.Buttons;

	class ButtonsBlock {
		constructor(butonsArr) {
			this.butonsArr.forEach(button => {
				this.[button.name]._el.classList.add('button');
				this.[button.name]._el.innerText = this._options.text || 'Press me';
		}
	}

	//export
	window.ButtonsBlock = ButtonsBlock;

})();
