(function () {
    // import
    const Button = window.Button;
    const View = window.View;
	const loginView = window.loginView;

//lalala
    class mainView extends View {
        constructor(options = {}){
            super(options);
            this._el = document.querySelector('.js-main');
            this.createElements();
            this.addElements();
            this.addListeners();
            this.hide();
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
                console.log('click login');
                this.router.go('/login/', loginView);
            });
            this.buttonRegister._get().addEventListener('click', (event) => {
                console.log('click register');
                this.router.go('/registration/');
            });
        }
    }

    window.mainView = mainView;
}());
