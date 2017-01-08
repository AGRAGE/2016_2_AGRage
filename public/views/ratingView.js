(function () {
    // import
    const Button = window.Button;
    const View = window.View;

    class ratingView extends View {
        constructor(options = {}){
            super(options);
            this._el = document.querySelector('.js-rating');


            
           this.sender = new User();
           this.sender.rating();
           console.log(this.sender.getLogin());
			this._el.innerHTML = '<div> this.sender.getLogin() </div>';
            this._el.innerHTML = '<div> fsdgfhghfdg</div>';
        }
    }

    window.ratingView = ratingView;
}());
