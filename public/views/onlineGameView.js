(function () {
    // import
   //  const Button = window.Button;
   //  const View = window.View;

   //  class searchGameView extends View {
   //      constructor(options = {}){
   //          super(options);
   //          this._el = document.querySelector('.js-searchGame');
			// this._el.innerHTML = '<h1> Здесь будет поиск игры! </h1>';
   //      }
   //  }

   //  window.searchGameView = searchGameView;

    const View = window.View;
    const Form = window.Form;
    const TD_online = window.TD_online;


    class onlineGameView extends View {
        constructor(options = {}) {
            super(options);
            this._el = document.querySelector('.js-game');
            this.addListeners();
            this.hide();
            this.backGround = document.getElementsByClassName('bg');
            this.gameBackGround = document.getElementsByClassName('gamebg');
            //this.backGround[0].hidden = "hidden";
            this.isGame = false;

        }

        init(options = {}) {}

        _initCanvas() {
            this.canvas = this._el.querySelector('.js-canvas');
            this.canvas.width = /*this._el.clientWidth + ''*/"1280";
            this.canvas.height = /*this._el.clientHeight + ''*/"720";
        }
        resume() {
            super.resume();
            if (!this.isGame) {
                this.newSession();
            }
        }

        pause() {
            super.pause();
            this.gameBackGround[0].hidden = "hidden";
        }




        newSession() {
            function sessionCheck() { // (3)
                if (xhr.readyState != 4) return;
                if (xhr.status == 200) {
                    var data = xhr.responseText != "" ? JSON.parse(xhr.responseText) : {};
                    this._initCanvas();
                    this.backGround[0].hidden = "hidden";
                    this.gameBackGround[0].hidden = "";
                    this._game = new TD_online({
                        ctx: this.canvas.getContext('2d'),
                        width: +this.canvas.width,
                        height: +this.canvas.height
                    });

                    this._game.start();
                    window.isGame = true;
                    return true;
                } else {
                    this.router = new Router();
                    this.router.go('/');
                }
            }
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://agragebackend.herokuapp.com/api/user/session/', true);
            xhr.withCredentials = true;
            xhr.send(null);
            xhr.onreadystatechange = sessionCheck.bind(this);

        }

        addListeners() {
            console.log(this.router);
            document.addEventListener("DOMContentLoaded", (event) => {
                console.log(this.router);
                window.gameRouter = this.router;
                console.log(window.gameRouter);
            });




        }
    }


    window.onlineGameView = onlineGameView;
}());
