(function() {
	class User {
		constructor(data = {}) {
			this.email = data.email || '';
			this.login = data.login || '';
			this.score = data.score || 0;
			this.password = data.password || '';
			this.isAuth = data.isAuth || 0;
			this.id = data.id || '';
		}

		setUser(data = {}) {
			this.email = data.email || '';
			this.login = data.login || '';
			this.score = data.score || 0;
			this.password = data.password || '';
			this.isAuth = data.isAuth || 0;
			this.id = data.id || '';
		}

		getUser() {
			return {
				email: this.email,
				login: this.login,
				score: this.score,
				password: this.password,
				id: this.id
			};
		}

		getEmail() {
			return this.email;
		}

		getPassword() {
			return this.password;
		}

		getLogin() {
			return this.login;
		}

		getID() {
			return this.id;
		}


		registration() {
			return this.sendRequest('registration/', 'POST', {
				login: this.login,
				password: this.password,
				email: this.email
			});
		}

		autentification() {
			return this.sendRequest('login/', 'POST', {
				login: this.login,
				password: this.password
			});
		}

		sendRequest(to, curMethod, curBody = {}) {
			return new Promise((resolve, reject) => {
				//let responseObj = {};
				const baseUrl = 'https://agragebackend.herokuapp.com/api/user/';
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
					.then(
						function(response) {
							if (response.status !== 200) {
								console.log('Looks like there was a problem. Status Code: ' +
									response.status);
								return;
							}

							// Examine the text in the response
							response.json().then(function(data) {
								console.log(data);
							});
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
					/*.then(function(response) {
						console.log(response.json());
						return response.json();
  					})
					.then(function(data) {
						resolve(data);
					})
									.catch(function(error) {
										console.log('Request failed', error);
										let responseObj = {
											status: 0
										};
										reject(responseObj);
									});*/
			})
		}

		sendRequestList(to, curMethod, curBody = {}) {
			return new Promise((resolve, reject) => {
				//let responseObj = {};
				const baseUrl = 'https://agragebackend.herokuapp.com/api/user/';
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
						let responseObj = { status: data.status};
						resolve(responseObj);
					})
					.catch(function(error) {
						console.log('Request failed', error);
						let responseObj = { status: 0};
						reject(responseObj);
					});
			})
		}


		rating() {
			return this.sendRequestList('rating/', 'POST', {
				login: this.login,
				
			});
		}
	}
	// export
	window.User = User;
}());
