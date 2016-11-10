(function() {
	class User {

		constructor(data = {}) {
			this.email = data.email || '';
			this.login = data.login || '';
			this.score = data.score || 0;
			this.password = data.password || '';
			this.isAuth = data.isAuth || 0;
			this.responseObj = data.responseObj || {};
		}

		setUser(data = {}) {
			this.email = data.email || '';
			this.login = data.login || '';
			this.score = data.score || 0;
			this.password = data.password || '';
			this.session = data.session || '';
		}

		getUser() {
			return {
				email: this.email,
				login: this.login,
				score: this.score,
				password: this.password,
				session: this.session
			};
		}

		getEmail() {
			return this.email;
		}

		getPassword() {
			return this.email;
		}

		getLogin() {
			return this.email;
		}


		registration() {
			this.sendRequest('registration/', 'POST', {
				email: this.email,
				login: this.login,
				password: this.password
			});
		}

		login() {
			this.sendRequest('/login', 'POST', {
				login: this.login,
				password: this.password
			});
		}

		sendRequest(to, curMethod, curBody = {}) {
			const baseUrl = 'http://89.19.173.36:8080/api/user';
			const myUrl = baseUrl + to;
			fetch(myUrl, {
					method: curMethod,
					mode: 'cors',
					credentials: 'include',
					headers: {
						"Content-type": "application/json; charset=UTF-8"
					},
					body: JSON.stringify(curBody)
				})
				.then(function(data) {
					console.log('Request succeeded with JSON response', data);
				})
				.catch(function(error) {
					console.log('Request failed', error);
				});
		}
	}
	// export
	window.User = User;
}());
