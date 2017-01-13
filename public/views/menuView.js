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
			this.tableExist = true;
			this.cookieCheck();
		}

		cookieCheck() {
			function checkUsability() {
				console.log(xhr.readyState);
				if (xhr.readyState != 4) {
					return;
				}
				this.pause();
				this.createElements();
				this.addElements();
				this.addListeners();
				this.newProfile();
				if (xhr.status == 200) {
					this.resume();
				} else {
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



		logout2() {
			function logoutCheck() { // (3)
				if (xhr.readyState != 4) return;
				if (xhr.status == 200) {
					var data = xhr.responseText != "" ? JSON.parse(xhr.responseText) : {};
					this.router = new Router();
					this.router.go('/');
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

		table(responseObj) {
			var str = "<table class = \"profileTable\" border=\"0\" cellspacing=\"0\" cellpadding=\"2\" align=\"center\" >";
			str += "<tr>";
			str += "<td >Здравствуйте,</td>";
			str += "<td >" + responseObj.username + "</td>";
			str += "</tr>";
			str += "</table>";
			this._el.insertAdjacentHTML("afterBegin", str);
		}

		newProfile() {
			function profileCheck() { // (3)
				if (xhr.readyState != 4) return;

				if (xhr.status == 200) {
					var data = xhr.responseText != "" ? JSON.parse(xhr.responseText) : {};
					this.table(data);
					this.tableExist = true;
					//return data;
					return true;
				} else {
					this.router = new Router();
					this.router.go('/');
				}
			}
			console.log("send for rating");
			var xhr = new XMLHttpRequest();
			xhr.open('POST', 'https://agragebackend.herokuapp.com/api/user/session/', true);
			xhr.withCredentials = true;
			xhr.send(null);
			xhr.onreadystatechange = profileCheck.bind(this);
			return xhr.responseText;
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
				this.router.go('/game_online');
			});
			this.buttonRating._get().addEventListener('click', (event) => {
				this.router.go('/rating');
			});
			this.buttonUserProfile._get().addEventListener('click', (event) => {
				this.router.go('/profile');
			});
			this.buttonConfig._get().addEventListener('click', (event) => {
				this.router.go('/config');
			});
			this.buttonExit._get().addEventListener('click', (event) => {
				this.logout2();
			});
		}
	}

	window.menuView = menuView;
}());
