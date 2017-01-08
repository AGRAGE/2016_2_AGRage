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
			this.createElements();
			this.addElements();
			this.addListeners();
			this.hide();

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
								console.log(myUser);
								console.log(responseObj);
								this.cookie = new Cookie(myUser.getID(), myUser.getLogin());
								window.myUser.isAuth = 1;
								this.router.go('/menu/');
								resolve();

						})
						.catch((err) => {
								alert('Неебучая проблема с атентификацией!!!' + err);
						})
				} else {
					alert('Неправильные ты, дядя Федор, данные вводишь!');
				}
			});

		}

		validation(data) {
			return true;
		}
	}

	window.loginView = loginView;
}());
