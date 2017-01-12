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
			this.newRating();
			this.createElements();
			this.addElements();
			this.addListeners();

			//}
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
				this.router.go('/menu');
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

		newRating() {
			function ratingCheck() { // (3)
				if (xhr.readyState != 4) return;
				if (xhr.status == 200) {
					var data = xhr.responseText != "" ? JSON.parse(xhr.responseText) : {};
					this.table(data);
					//return data;
					return true;
				}
			}
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
