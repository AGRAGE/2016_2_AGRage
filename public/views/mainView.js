(function () {
    // import
    const Button = window.Button;
    const View = window.View;
	const loginView = window.loginView;
    const Cookie = window.Cookie;

    class mainView extends View {
        constructor(options = {}){
            super(options);
            this._el = document.querySelector('.js-main');
            this.createElements();
            this.addElements();
            this.addListeners();
            this.hide();
            this.cookie = new Cookie();


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


            document.addEventListener("DOMContentLoaded", (event) => {
                if (this.cookie.get_cookie("username")){
                    console.log(this.cookie.get_cookie("username"));
                    console.log('loged in');
                    this.router.go('/menu');

                }
                else{
                    console.log('unloged');
                    this.router.go('/');
                }
            });


            this.buttonLogin._get().addEventListener('click', (event) => {
                this.router.go('/login');
            });
            this.buttonRegister._get().addEventListener('click', (event) => {
                this.router.go('/registration');
            });
        }
    }

    window.mainView = mainView;
}());
