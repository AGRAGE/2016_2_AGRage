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
			//if (this.cookieCheck()) {
			this.cookieChecked = false;
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

		authorization(data) {
			function goAuthorization() { // (3)
				if (xhr.readyState != 4) return;
				if (xhr.status == 200) {
					//var result = xhr.responseText != "" ? JSON.parse(xhr.responseText) : {};
					this.router.go('/menu');
					this.loginButton.disabled = false;
					this.loginButton.innerHTML = "Войти";
					this.errorMessage.hidden = true;
				} else if (xhr.status == 400){
					this.loginButton.disabled = false;
					this.loginButton.innerHTML = "Войти";
					this.errorMessage.hidden = false;
					this.errorMessage.innerHTML = "Неправильный логин или пароль. попробуйте еще раз!";
				}
			};
			var xhr = new XMLHttpRequest();
			xhr.open('POST', 'https://agragebackend.herokuapp.com/api/user/login/', true);
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.withCredentials = true;
			console.log(JSON.stringify(data));
			xhr.send(JSON.stringify(data));
			xhr.onreadystatechange = goAuthorization.bind(this);
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
			var errorMessage = document.createElement('div');
			errorMessage.className = "errorMessage";
			errorMessage.innerHTML = "";
			this.errorMessage = errorMessage;
		}

		addElements() {
			this._el.appendChild(this.loginForm._get());
			this.errorMessage.hidden = true;
			this._el.appendChild(this.errorMessage);
			this.loginButton = document.getElementsByClassName('loginButton')[0];
		}

		addListeners() {

			this.loginForm._get().addEventListener('submit', event => {
				event.preventDefault();
				this.loginButton.disabled = true;
				this.loginButton.innerHTML = "Пожалуйста, подождите";
				let data = this.loginForm.getFormData();
				if (this.validation(data)) {
					/*window.myUser = new User(data);
					window.myUser.autentification()
						.then((responseObj) => {
							window.myUser.setUser(responseObj.body);
							//document.cookie = responseObj.cookie;
							window.myUser.isAuth = 1;
							this.router.go('/menu');
							this.loginButton.disabled = false;
							this.loginButton.innerHTML = "Войти";
						})
						.catch((err) => {
							alert('Проблема с аутентификацией: ' + err);
							this.loginButton.disabled = false;
							this.loginButton.innerHTML = "Войти";
						})*/
					this.authorization(data);
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

	window.loginView = loginView;
}());
