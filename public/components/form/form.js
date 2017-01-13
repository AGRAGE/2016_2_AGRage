(function() {
	'use strict';
	// import
	const Block = window.Block;
	const Button = window.Button;

	class Form extends Block {

		/**
		 * Конструктор класса Form
		 */
		constructor(options = {
			data: {}
		}) {
			super('form');
			this.template = window.fest['form/form.tmpl'];
			this.data = options.data;
			this._el = options.el;
			this.render();
		}

		/**
		 * Обновляем HTML
		 */
		render() {
			this._updateHtml();
			//this._installControls();
		}

		/**
		 * Обнуляем форму
		 */
		reset() {
			this._el.querySelector('form').reset();
		}

		/**
		 * Обновить html компонента
		 */
		_updateHtml() {
			this._el.innerHTML = this.template(this.data);
		}

		/**
		 * Вставить управляющие элементы в форму
		 */
		_installControls() {
			let {
				controls = []
			} = this.data;

			controls.forEach(data => {
				let control = new Button({
					text: data.text
				});
				this._el.querySelector('.js-controls').appendChild(control._get());
			});
		}

		/**
		 * Взять данные формы
		 * @return {object}
		 */
		getFormData() {
			let form = this._el.querySelector('form');
			let elements = form.elements;
			let fields = {};

			Object.keys(elements).forEach(element => {
				let name = elements[element].name;
				let value = elements[element].value;

				if (!name) {
					return;
				}

				fields[name] = value;
			});

			return fields;
		}

		// validate form
		tryEmptyField() {
			let formData = this.getFormData(),
				errors = [],
				lastErrors = Array.from(document.getElementsByClassName('error'));
			lastErrors.forEach((element) => {
				element.classList.remove('error');
			});
			Object.keys(formData).forEach((field) => {
				if (formData[field] == false) {
					errors.push(field);
				}
			});
			errors.forEach((field) => {
				this.el.querySelector(`input[name=${field}]`).parentNode.classList.add('error');
			});
			return errors;
		}

		validateEmail(field) {
			const apos = field.indexOf('@');
			const dotpos = field.lastIndexOf('.');
			if (apos < 1 || dotpos - apos < 2) {
				return false;
			} else {
				return true;
			}
		}

		validateUsername(fld) {
			let error = '',
				illegalChars = /\W/; // allow letters, numbers, and underscores
			if ((fld.length < 5) || (fld.length > 15)) {
				error += 'Username от 5 до 15 символов!';
			} else if (illegalChars.test(fld)) {
				error += 'Username только буквы, цифры, нижн.подчеркивание!';
			}
			return error;
		}

		validatePassword(fld, fld2) {
			let error = '',
				illegalChars = /[\W_]/; // allow only letters and numbers

			if ((fld.length < 6) || (fld.length > 15)) {
				error += 'Пароль от 6 до 15 символов!';
			}
			if (illegalChars.test(fld)) {
				error += 'Пароль только цифры и буквы!';
			}
			if (fld != fld2) {
				error += 'Повтори пароль правильно!';
			}
			return error;
		}

		tryValidate() {
			let form = this.el,
				formData = this.getFormData(),
				errorMess = '';
			if (!this.validateEmail(formData.email)) {
				this.el.querySelector('input[name=email]').parentNode.classList.add('error');
				errorMess += 'Заполни правильно Email!';
			}
			const userValid = this.validateUsername(formData.login);
			if (userValid) {
				this.el.querySelector('input[name=login]').parentNode.classList.add('error');
				errorMess += userValid;
			}
			const passValid = this.validatePassword(formData.password, formData.passwordRepeat);
			if (passValid) {
				this.el.querySelector('input[name=password]').parentNode.classList.add('error');
				this.el.querySelector('input[name=passwordRepeat]').parentNode.classList.add('error');
				errorMess += passValid;
			}
			return errorMess;
		}

	}

	//export
	window.Form = Form;
})();
