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
			this.sender = new User();
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
				let data = this.loginForm.getFormData();
				console.log(data);
				console.log(this.loginForm.getFormData());
				if(this.validation(data)){
					console.log('click login');
					this.sender.login(data);
					this.router.go('/menu');
				}
				else {
					alert('Неправильные ты, дядя Федор, данные вводишь!');
				}
			});

		}

		validation(data){
			return true;
		}
	}

	window.loginView = loginView;
}());
