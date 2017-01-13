(function() {
	// import
	const Button = window.Button;
	const View = window.View;

	class ratingView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.js-rating');
			this.backGround = document.getElementsByClassName('bg');
			this.tableExist = false;
			//if (this.cookieCheck()) {
			//this.newRating();
			//}
		}

		resume() {
			super.resume();
			if (this.backGround[0]) {
				this.backGround[0].hidden = "";
			}
			if (!this.tableExist) {
				this.newRating();
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
				this.router.go('/menu');
			});
		}



		newRating() {
			function ratingCheck() { // (3)
				if (xhr.readyState != 4) return;

				if (xhr.status == 200) {
					var data = xhr.responseText != "" ? JSON.parse(xhr.responseText) : {};
					this.createElements();
					this.addElements();
					this.addListeners();
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
			xhr.open('POST', 'https://agragebackend.herokuapp.com/api/user/rating/', true);
			xhr.withCredentials = true;
			xhr.send(null);
			xhr.onreadystatechange = ratingCheck.bind(this);

		}

		rating() {
			return this.sendRequest('rating/', 'POST', {}, "include");

		}
	}

	window.ratingView = ratingView;
}());
