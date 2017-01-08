(function() {
	// import
	const Button = window.Button;
	const View = window.View;

	class ratingView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.js-rating');
			this._el.hidden="";
			window.myUser = new User();

			window.myUser.rating()
				.then((responseObj) => {
					console.log(responseObj);
					this.table(responseObj);


				})
				.catch((err) => {
					alert('Рейтинг временно недоступен. Перезвоните позже. Пип. Пип. Пип ' + err);
				})

			this.backGround = document.getElementsByClassName('bg');
			this.backGround[0].hidden = "";
			//console.log();
			//this._el.innerHTML = '<div> this.sender.getLogin() </div>';
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
			var str = "<table border=\"1\" cellspacing=\"0\" cellpadding=\"2\" align=\"center\" width = \"2000px\" >";
			responseObj.forEach(user => {
				str+="<tr>";
				str+="<td color = \"#8B0000\">" + user.username + "</td>";
				str+="<td>" + user.rating + "</td>";
				str+="</tr>";
			})
			str += "</table>";
			this._el.innerHTML = str;
		}
	}

	window.ratingView = ratingView;
}());
