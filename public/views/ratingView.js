(function() {
	// import
	const Button = window.Button;
	const View = window.View;

	class ratingView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.js-rating');
			this.backGround = document.getElementsByClassName('bg');
			//if (this.cookieCheck()) {
			window.myUser = new User();
			window.myUser.rating()
				.then((responseObj) => {
					console.log(responseObj);
					this.table(responseObj);
					this.addElements();
					this.addListeners();

				})
				.catch((err) => {
					alert('Рейтинг не отвечает или временно недоступен. Перезвоните позже. Пип. Пип. Пип ' + err);
				})
				/*window.myUser.session()
				.then((responseObj) => {
					console.log(responseObj);
				})
				.catch((err) => {
					alert('Сессия не отвечает или временно недоступена. Перезвоните позже. Пип. Пип. Пип ' + err);
				})
*/
			this.createElements();
			//}
		}

		cookieCheck() {
			if (window.cookie === undefined) {
				this.router = new Router();
				this.router.go('/');
				this.pause();
				return false;
			} else {
				this.resume();
				return true;
			}
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

		table(responseObj) {
			var str = "<table class = \"table\" border=\"1\" cellspacing=\"0\" cellpadding=\"2\" align=\"center\" >";
			var counter = 1;
			responseObj.forEach(user => {
				if (counter < 11) {
					str += "<tr>";
					str += "<td >" + counter + "</td>";
					str += "<td>" + user.username + "</td>";
					str += "<td>" + user.rating + "</td>";
					str += "</tr>";
					counter++;
				}

			})
			str += "</table>";
			this._el.insertAdjacentHTML("afterBegin", str);
		}


		createElements() {
			this.buttonBack = new Button({
				el: document.createElement('button'),
				classAttrs: ['LoginButton'],
				text: 'вернуться в меню',
			});
		}


		addElements() {
			this._el.appendChild(this.buttonBack._get());
		}

		addListeners() {
			this.buttonBack._get().addEventListener('click', (event) => {
				this.pause();
				this.router.go('/menu/');
			});
		}
	}

	window.ratingView = ratingView;
}());
