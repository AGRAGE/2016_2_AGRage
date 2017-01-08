(function () {
    // import
    const Button = window.Button;
    const View = window.View;

    class ratingView extends View {
        constructor(options = {}){
            super(options);
            this._el = document.querySelector('.js-rating');

            this.backGround = document.getElementsByClassName('bg');
            this.backGround[0].hidden = "";

            window.myUser = new User();

           window.myUser.rating()
           .then((responseObj) => {
                console.log(responseObj);

                responseObj.forEach(user => {
                    this._el.innerHTML = '<div> user.getLogin() <br> </div>';

                })

            })
            .catch((err) => {
                alert('Неебучая проблема с атентификацией!!!' + err);
            })
           //console.log();
			//this._el.innerHTML = '<div> this.sender.getLogin() </div>';
            this._el.innerHTML = '<div> fsdgfhghfdg</div>';
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
    }

    window.ratingView = ratingView;
}());
