(function() {
	// import
	const Button = window.Button;
	const View = window.View;
	const loginView = window.loginView;

	class menuView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.js-menu');
			this.backGround = document.getElementsByClassName('bg');
			this.cookieCheck();
			if (this.cookieCheck()) {
				this.createElements();
				this.addElements();
				this.addListeners();
			}
		}

		cookieCheck() {
			if (window.cookie == undefined) {
				this.router = new Router();
				this.router.go('/');
				this.pause();
				return false;
			} else {
				this.resume();
				return true;
			}
		}

		resume() {
			super.resume();
			if (this.backGround[0]) {
				this.backGround[0].hidden = "";
			}
			console.log("resume");

		}

		pause() {
			super.pause();
			if (this.backGround[0]) {
				this.backGround[0].hidden = "hidden";
			}
			console.log("pause");
		}

		createElements() {
			this.buttonSingleGame = new Button({
				el: document.createElement('button'),
				classAttrs: ['LoginButton'],
				text: 'одиночная игра',
			});
			this.buttonSearchGame = new Button({
				el: document.createElement('button'),
				classAttrs: ['LoginButton'],
				text: 'поиск игры',
			});

			this.buttonRating = new Button({
				el: document.createElement('button'),
				classAttrs: ['LoginButton'],
				text: 'общий рейтинг',
			});
			this.buttonUserProfile = new Button({
				el: document.createElement('button'),
				classAttrs: ['LoginButton'],
				text: 'профиль',
			});

			this.buttonConfig = new Button({
				el: document.createElement('button'),
				classAttrs: ['LoginButton'],
				text: 'настройки',
			});

			this.buttonExit = new Button({
				el: document.createElement('button'),
				classAttrs: ['ExitButton'],
				text: 'выход из профиля',
			});
		}

		addElements() {
			this._el.appendChild(this.buttonSingleGame._get());
			this._el.appendChild(this.buttonSearchGame._get());
			this._el.appendChild(this.buttonRating._get());
			this._el.appendChild(this.buttonUserProfile._get());
			this._el.appendChild(this.buttonConfig._get());
			this._el.appendChild(this.buttonExit._get());
		}

		addListeners() {
			this.buttonSingleGame._get().addEventListener('click', (event) => {
				this.router.go('/game/');
			});
			this.buttonSearchGame._get().addEventListener('click', (event) => {
				this.router.go('/searchGame/');
			});
			this.buttonRating._get().addEventListener('click', (event) => {
				this.router.go('/rating/');
			});
			this.buttonUserProfile._get().addEventListener('click', (event) => {
				this.router.go('/profile/');
			});
			this.buttonConfig._get().addEventListener('click', (event) => {
				this.router.go('/config/');
			});
			this.buttonExit._get().addEventListener('click', (event) => {
				window.cookie.deleteCookie();
				window.cookie = undefined;
				this.pause();
				this.router.go('/');
			});
		}
	}

	window.menuView = menuView;
}());
