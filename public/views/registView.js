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
			this.sender = new User();
			this.createElements();
			this.addElements();
			this.addListeners();
			this.hide();
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
				if(this.validation(data)){
					window.myUser = new User(data);
					window.myUser.registration()
						.then((responseObj) => {
								window.myUser.setUser(responseObj);
								console.log(responseObj);
								console.log(myUser);
								console.log(window.myUser.getID());
								console.log(window.myUser.getLogin());
								this.cookie = new Cookie(window.myUser.getID(), window.myUser.getLogin(),"","","","/");
	                        	window.myUser.isAuth = 1;
	                        	this.router.go('/menu/');
	                    })
						.catch((err) => {
							 alert('Проблема с регистрацией: ' + err);
						})
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

	window.registView = registerView;
}());
