(function () {
    // import
    const Button = window.Button;
    const View = window.View;

    class ratingView extends View {
        constructor(options = {}){
            super(options);
            this._el = document.querySelector('.js-rating');

           window.myUser.rating()
           .then((responseObj) => {
                console.log(responseObj);

            })
            .catch((err) => {
                alert('Неебучая проблема с атентификацией!!!' + err);
            })
           //console.log();
			this._el.innerHTML = '<div> this.sender.getLogin() </div>';
            this._el.innerHTML = '<div> fsdgfhghfdg</div>';
        }
    }

    window.ratingView = ratingView;
}());
