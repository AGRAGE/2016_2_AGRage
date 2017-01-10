(function() {
	'use strict';

	const Button = window.Button;
	const View = window.View;
	const Form = window.Form;
	const Model = window.Model;
	const User = window.User;
	const Cookie = window.Cookie;


	class loginView extends View {
		constructor(options = {}) {
			super(options);

			this._el = document.querySelector('.js-login');
			this.backGround = document.getElementsByClassName('bg');
			this.cookieCheck();
			this.createElements();
			this.addElements();
			this.addListeners();
		}

		cookieCheck() {
			if (document.cookie != "") {
				this.pause();
				this.router = new Router();
				this.router.go('menu/');
			} else {
				this.resume();
			}
		}

		createElements() {
			this.loginForm = new Form({
				el: document.createElement('div'),
				data: {
					title: 'AGRage',
					titleClass: "title",
					fields: [{
						name: 'login',
						type: 'text',
						placeholder: "Enter your login",
						maxlength: "25",
						minlength: "5",
						required: "required",
						class: "form"
					}, {
						name: 'password',
						type: 'password',
						placeholder: "Enter your password",
						maxlength: "25",
						minlength: "5",
						required: "required",
						class: "form"
					}],
					controls: [{
						text: 'Войти',
						class: "loginButton",
						attrs: {
							type: 'submit'
						}
					}]
				}
			});
		}

		addElements() {
			this._el.appendChild(this.loginForm._get());
		}

		addListeners() {

			this.loginForm._get().addEventListener('submit', event => {
				event.preventDefault();
				let data = this.loginForm.getFormData();
				if (this.validation(data)) {
					window.myUser = new User(data);
					window.myUser.autentification()
						.then((responseObj) => {
							window.myUser.setUser(responseObj);
							window.cookie = new Cookie(window.myUser.getID(), window.myUser.getLogin(), "", "", "", "/");
							window.cookieName = window.myUser.getID();
							window.myUser.isAuth = 1;
							this.router.go('/menu/');

						})
						.catch((err) => {
							alert('Проблема с аутентификацией: ' + err);
						})
				} else {
					alert('Неправильные ты, дядя Федор, данные вводишь!');
				}
			});

		}
		resume() {
			super.resume();
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
		validation(data) {
			return true;
		}
	}

	window.loginView = loginView;
}());
