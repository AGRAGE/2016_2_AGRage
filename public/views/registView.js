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
			this.cookieChecked = false;
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
			xhr.timeout = 10000;
			xhr.withCredentials = true;
			xhr.send(null);
			xhr.onreadystatechange = check.bind(this);
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
			var errorMessage = document.createElement('div');
			errorMessage.className = "errorMessage";
			errorMessage.innerHTML = "";
			this.errorMessage = errorMessage;
		}

		authorization(data){
			function goAutorization() { // (3)
				if (xhr.readyState != 4) return;
				if (xhr.status == 200) {
					//var result = xhr.responseText != "" ? JSON.parse(xhr.responseText) : {};
					this.router.go('/menu');
					this.registButton.disabled = false;
					this.registButton.innerHTML = "Зарегистрироваться";
					this.errorMessage.hidden = true;
				}
			};
			var xhr = new XMLHttpRequest();
			xhr.open('POST', 'https://agragebackend.herokuapp.com/api/user/login/', true);
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.timeout = 10000;
			xhr.withCredentials = true;
			xhr.send(JSON.stringify(data));
			xhr.onreadystatechange = goAutorization.bind(this);
		}

		registration(data) {
			function goRegistration() { // (3)
				if (xhr.readyState != 4) return;
				if (xhr.status == 200) {
					//var result = xhr.responseText != "" ? JSON.parse(xhr.responseText) : {};
					this.authorization(this.newLoginData(data));
				} else if (xhr.status == 400){
					this.registButton.disabled = false;
					this.registButton.innerHTML = "Зарегистрироваться";
					this.errorMessage.hidden = false;
					this.errorMessage.innerHTML = "Данный логин уже зарегистрирован. Попробуйте еще раз!";
				}else if (xhr.status == 400){
					this.registButton.disabled = false;
					this.registButton.innerHTML = "Зарегистрироваться";
					this.errorMessage.hidden = false;
					this.errorMessage.innerHTML = "Сервер не отвечает. Попробуйте еще раз!";
				}
			};

			var xhr = new XMLHttpRequest();
			xhr.open('POST', 'https://agragebackend.herokuapp.com/api/user/registration/', true);
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.timeout = 10000;
			xhr.withCredentials = true;
			xhr.send(JSON.stringify(data));
			xhr.onreadystatechange = goRegistration.bind(this);
		}

		addElements() {
			this._el.appendChild(this.registForm._get());
			this.errorMessage.hidden = true;
			this._el.appendChild(this.errorMessage);
			this.registButton = document.getElementsByClassName('loginButton')[0];
		}

		newRegistData(data) {
			var newData = {
				login: data.login,
				email: data.email,
				password: data.password
			}
			return newData;
		}

		newLoginData(data) {
			var newData = {
				login: data.login,
				password: data.password
			}
			return newData;
		}

		addListeners() {


			this.registForm._get().addEventListener('submit', event => {
				event.preventDefault();
				let data = this.registForm.getFormData();
				if (this.validation(data)) {
					this.registButton.disabled = true;
					this.registButton.innerHTML = "Пожалуйста, подождите...";
					this.registration(this.newRegistData(data));
					/*window.myUser = new User(data);
					window.myUser.registration()
						.then((responseObj) => {
							window.myUser.autentification()
								.then((responseObj) => {
									window.myUser.isAuth = 1;
									this.pause();
									this.router.go('/menu');
								})
						})
						.catch((err) => {
							alert('Проблема с регистрацией: ' + err);
						})*/
				} else {
					alert('Неправильные ты, дядя Федор, данные вводишь!');
				}
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
		validation(data) {
			return true;
		}
	}

	window.registView = registerView;
}());
