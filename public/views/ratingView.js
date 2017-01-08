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

            this.createElements();
            this.addElements();
            this.addListeners();
            this.hide();
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
                if (counter < 11){


    				str+="<tr>";
                    str+="<td >" + counter + "</td>";
    				str+="<td>" + user.username + "</td>";
    				str+="<td>" + user.rating + "</td>";
    				str+="</tr>";
                    counter++;
                }

			})
			str += "</table>";
			this._el.innerHTML = str;
		}

        createElements() {
            this.buttonBack = new Button({
                el: document.createElement('button'),
                classAttrs: ['BackButton'],
                text: 'вернуться в меню',
            });
        }

        addElements() {
            this._el.appendChild(this.buttonBack._get());
        }

        addListeners() {
            this.buttonBack._get().addEventListener('click', (event) => {
                this.router.go('/menu/');
            });
        }
	}

	window.ratingView = ratingView;
}());
