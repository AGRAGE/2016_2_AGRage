(function() {
	// import
	const Button = window.Button;
	const View = window.View;
	const loginView = window.loginView;

	class menuView extends View {
		constructor(options = {}) {
			super(options);
			console.log("menuView constructor start");
			this._el = document.querySelector('.js-menu');
			this.backGround = document.getElementsByClassName('bg');
			this.cookieCheck();

			/*if (this.cookieCheck()) {
				this.createElements();
				this.addElements();
				this.addListeners();
			} else {
				this.pause();
				this.router = new Router();
				this.router.go('/');
			}*/
		}

		cookieCheck() {
			function checkUsability() {
				console.log(xhr.readyState);
				if (xhr.readyState != 4) {
					return;
				}
				if (xhr.status == 200) {
					this.createElements();
					this.addElements();
					this.addListeners();
					console.log(xhr.status);
				} else {
					console.log(xhr.status);
					this.pause();
					this.router = new Router();
					this.router.go('/');
				}
			}
			var xhr = new XMLHttpRequest();
			xhr.open('POST', 'https://agragebackend.herokuapp.com/api/user/session/', true);
			xhr.withCredentials = true;
			xhr.send(null);
			xhr.onreadystatechange = checkUsability.bind(this);
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

		createElements() {
			this.buttonSingleGame = new Button({
				el: document.createElement('button'),
				classAttrs: ['LoginButton'],
				text: 'одиночная игра',
			});
			this.buttonSearchGame = new Button({
				el: document.createElement('button'),
				classAttrs: ['LoginButton'],
				text: 'поиск игры',
			});

			this.buttonRating = new Button({
				el: document.createElement('button'),
				classAttrs: ['LoginButton'],
				text: 'общий рейтинг',
			});
			this.buttonUserProfile = new Button({
				el: document.createElement('button'),
				classAttrs: ['LoginButton'],
				text: 'профиль',
			});

			this.buttonConfig = new Button({
				el: document.createElement('button'),
				classAttrs: ['LoginButton'],
				text: 'настройки',
			});

			this.buttonExit = new Button({
				el: document.createElement('button'),
				classAttrs: ['LoginButton'],
				text: 'выход из профиля',
			});
		}

		sendRequest(to, curMethod, curBody = {}, cookie) {
			return new Promise((resolve, reject) => {
				//let responseObj = {};
				const baseUrl = 'https://agragebackend.herokuapp.com/api/user/';
				const myUrl = baseUrl + to;
				fetch(myUrl, {
						method: curMethod,
						mode: 'cors',
						credentials: cookie,
						headers: {
							"Content-Type": "application/json; charset=UTF-8",
						},
						body: JSON.stringify(curBody)
					})
					.then(
						function(response) {
							console.log(response);
							if (response.status !== 200) {
								console.log('Looks like there was a problem. Status Code: ' +
									response.status);
								return;
							}
							resolve(response.json());
						}
					)
					.catch(function(err) {
						console.log('Fetch Error :-S', err);
						let responseObj = {
							status: 0
						};
						reject(responseObj);
					})
			})
		}

		logout() {
			return this.sendRequest('logout/', 'POST', {}, "include");

		}
		logout2() {
			function logoutCheck() { // (3)
				if (xhr.readyState != 4) return;
				if (xhr.status == 200) {
					var data = xhr.responseText != "" ? $.parseJSON(xhr.responseText) : {};
					//return data;
					return true;
				}
			}
			var xhr = new XMLHttpRequest();
			xhr.open('POST', 'https://agragebackend.herokuapp.com/api/user/logout/', true);
			xhr.withCredentials = true;
			xhr.send(null);
			xhr.onreadystatechange = logoutCheck.bind(this);

		}



		addElements() {
			this._el.appendChild(this.buttonSingleGame._get());
			this._el.appendChild(this.buttonSearchGame._get());
			this._el.appendChild(this.buttonRating._get());
			this._el.appendChild(this.buttonUserProfile._get());
			this._el.appendChild(this.buttonConfig._get());
			this._el.appendChild(this.buttonExit._get());
		}

		addListeners() {
			this.buttonSingleGame._get().addEventListener('click', (event) => {
				this.router.go('/game/');
			});
			this.buttonSearchGame._get().addEventListener('click', (event) => {
				this.router.go('/searchGame/');
			});
			this.buttonRating._get().addEventListener('click', (event) => {
				this.router.go('/rating/');
			});
			this.buttonUserProfile._get().addEventListener('click', (event) => {
				this.router.go('/profile/');
			});
			this.buttonConfig._get().addEventListener('click', (event) => {
				this.router.go('/config/');
			});
			this.buttonExit._get().addEventListener('click', (event) => {
				if(this.logout2()){
					this.router = new Router();
					this.router.go('/');
				};
			});
		}
	}

	window.menuView = menuView;
}());
