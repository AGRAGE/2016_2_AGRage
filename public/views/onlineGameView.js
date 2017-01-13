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
            this.backGround[0].hidden = "hidden";

        }

        init(options = {}) {}

        _initCanvas() {
            this.canvas = this._el.querySelector('.js-canvas');
            this.canvas.width = this._el.clientWidth + '';
            this.canvas.height = this._el.clientHeight + '';
        }

        resume() {
            super.resume();
            this._initCanvas();

            this._game = new TD_online({
                ctx: this.canvas.getContext('2d'),
                width: +this.canvas.width,
                height: +this.canvas.height
            });

            this._game.start();
            window.isGame = true;
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
