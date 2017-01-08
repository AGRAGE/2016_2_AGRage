(function () {
    // import
    const Button = window.Button;
    const View = window.View;

    class profileView extends View {
        constructor(options = {}){
            super(options);
            this._el = document.querySelector('.js-profile');
            this.backGround = document.getElementsByClassName('bg');
            this.backGround[0].hidden = "";
			this._el.innerHTML = '<h1> Здесь будет профиль игрока! </h1>';
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
    }

    window.profileView = profileView;
}());
