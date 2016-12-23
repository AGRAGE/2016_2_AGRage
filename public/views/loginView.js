(function() {
	'use strict';

	const Button = window.Button;
	const View = window.View;
	const Form = window.Form;
	const Model = window.Model;
	const User = window.User;


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
			document.addEventListener("DOMContentLoaded", (event) => {
				if (window.myUserSession ){
					this.router.go('/menu');
				}
			});
			this.loginForm._get().addEventListener('submit', event => {
				event.preventDefault();
				let data = this.loginForm.getFormData();
				this.sender = new User(data);
				if (this.validation(data)) {
					//this.sender.autentification();
					//this.sender.sendRequest('/login', 'POST', JSON.stringify(data))
					this.sender.autentification()
						.then((responseObj) => {
							if (responseObj.status == 200) {
								this.sender.isAuth = 1;
								window.myUserSession = true;
								console.log(myUserSession);
								this.router.go('/menu/');

							}
						})
						.catch(() => {
								alert('Неправильные ты, дядя Федор, данные вводишь!');
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
