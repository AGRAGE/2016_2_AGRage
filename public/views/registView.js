(function() {
	'use strict';

	const Button = window.Button;
	const View = window.View;
	const Form = window.Form;
	const Model = window.Model;
	class registerView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.js-regist');
			this.backGround = document.getElementsByClassName('bg');
			//this.cookieCheck();
			this.sender = new User();
			this.createElements();
			this.addElements();
			this.addListeners();
		}

		cookieCheck() {
			if (document.cookie != "") {

				this.router = new Router();
				this.router.go('menu/');
				this.pause();
			} else {
				this.resume();
			}
		}

		createElements() {
			this.registForm = new Form({
				el: document.createElement('div'),
				data: {
					title: 'AGRage',
					titleClass: "title",
					fields: [{
						name: 'login',
						type: 'text',
						placeholder: "Введите ваш логин",
						maxlength: "25",
						minlength: "5",
						required: "required",
						class: "form"
					}, {
						name: 'email',
						type: 'email',
						placeholder: "Введите ваш email",
						required: "required",
						class: "form"
					}, {
						name: 'password',
						type: 'password',
						placeholder: "Веедите ваш пароль",
						maxlength: "25",
						minlength: "6",
						required: "required",
						class: "form"
					}],
					controls: [{
						text: 'Зарегистрироваться',
						class: "loginButton",
						attrs: {
							type: 'submit'
						}
					}]
				}
			});
		}

		addElements() {
			this._el.appendChild(this.registForm._get());
		}

		addListeners() {


			this.registForm._get().addEventListener('submit', event => {
				event.preventDefault();
				let data = this.registForm.getFormData();
				if (this.validation(data)) {
					window.myUser = new User(data);
					window.myUser.registration()
						.then((responseObj) => {
							window.myUser.setUser(responseObj.body);
							window.myUser.autentification()
								.then((responseObj) => {
									window.myUser.isAuth = 1;
									this.pause();
									this.router.go('/menu');
								})
						})
						.catch((err) => {
							alert('Проблема с регистрацией: ' + err);
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

	window.registView = registerView;
}());
