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
                this.table(responseObj);
               

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


        table(responseObj){
            var html = '<table>';   

            responseObj.forEach(user => {
                       // this._el.innerHTML = '<div> user.getLogin() <br> </div>';
                console.log(user.username);
                html += '<tr>';
                html += '<td>'+user.username+'</td>' + '<td>'+user.rating+'</td>';
                html += '</tr>';
            })
            html += '<td></td><td></td></tr>';
            html +='</table>';
            // for(var i in ) {
            //     if(cnt == 0) {
            //         html += '<tr>';
            //     }
            //     html += '<td>'+products[i]['id']+'</td>' + '<td>'+products[i]['name']+'</td>';
            //     cnt++;
            //     if(cnt == 2) {
            //         cnt = 0;
            //         html += '</tr>';
            //     }
            // } 
            // if(cnt != 0) {
            //     html += '<td></td><td></td></tr>';
            // }
            // html +='</table>';
        }
    }

    window.ratingView = ratingView;
}());
