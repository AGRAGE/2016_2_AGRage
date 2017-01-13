(function() {
	// import
	const Button = window.Button;
	const View = window.View;
	const loginView = window.loginView;
	const Cookie = window.Cookie;

	class mainView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.js-main');
			this.backGround = document.getElementsByClassName('bg');
			//if (this.cookieCheck()) {
			this.cookieChecked = false;
			/*window.myUser.session()
				.then((responseObj) => {
					console.log(responseObj);
				})
				.catch((err) => {
					alert('Рейтинг не отвечает или временно недоступен. Перезвоните позже. Пип. Пип. Пип ' + err);
				})*/
			//}

		}

		cookieCheck() {
			function check() { // (3)
				if (xhr.readyState != 4) return;
				if (xhr.status == 200) {
					var data = xhr.responseText != "" ? JSON.parse(xhr.responseText) : {};
					this.router = new Router();
					this.router.go('/menu');
					//return data;
					return true;
				} else {
					this.createElements();
					this.addElements();
					this.addListeners();
					this.cookieChecked = true;

				}
			}
			console.log("send for session");
			var xhr = new XMLHttpRequest();
			xhr.open('POST', 'https://agragebackend.herokuapp.com/api/user/session/', true);
			xhr.withCredentials = true;
			xhr.send(null);
			xhr.onreadystatechange = check.bind(this);
		}

		createElements() {
			this.buttonLogin = new Button({
				el: document.createElement('button'),
				classAttrs: ['mainLoginButton'],
				text: 'ВОЙТИ',
			});

			this.buttonRegister = new Button({
				el: document.createElement('button'),
				classAttrs: ['mainRegistrationButton'],
				text: 'РЕГИСТРАЦИЯ',
			});
		}

		addElements() {
			this._el.appendChild(this.buttonLogin._get());
			this._el.appendChild(this.buttonRegister._get());
		}

		addListeners() {
			this.buttonLogin._get().addEventListener('click', (event) => {
				this.pause();
				this.router.go('/login');
			});
			this.buttonRegister._get().addEventListener('click', (event) => {
				this.pause();
				this.router.go('/registration');
			});
		}
		resume() {
			super.resume();
			if (!this.cookieChecked) {
				this.cookieCheck();
			}
			if (this.backGround[0]) {
				this.backGround[0].hidden = "";
			}

		}

		pause() {
			super.pause();
			if (this.backGround[0]) {
				this.backGround[0].hidden = "hidden";
			}
		}
	}

	window.mainView = mainView;
}());
