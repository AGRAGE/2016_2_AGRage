(function () {
    // import
    const Button = window.Button;
    const View = window.View;

    class ratingView extends View {
        constructor(options = {}){
            super(options);
            this._el = document.querySelector('.js-rating');



            window.myUser = new User();

            window.myUser.rating()
            .then((responseObj) => {
                console.log(responseObj);
                this.table(responseObj);
               

            })
            .catch((err) => {
                alert('Неебучая проблема с атентификацией!!!' + err);
            })

            this.backGround = document.getElementsByClassName('bg');
            this.backGround[0].hidden = "";
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
            // var html = '<table>';   

            // responseObj.forEach(user => {
            //            // this._el.innerHTML = '<div> user.getLogin() <br> </div>';
            //     console.log(user.username);
            //     html += '<tr>';
            //     html += '<td>'+user.username+'</td>' + '<td>'+user.rating+'</td>';
            //     html += '</tr>';
            // })
            // html += '<td></td><td></td></tr>';
            // html +='</table>';
            // var i, j;
        // Сначала нарисуем саму таблицу.
        // Внутренние кавычки (внутри тэгов) можно сделать одиночными,
        // а можно, как здесь, воспользоваться спецсимволом (см. урок 2)
        document.write("<table border=\"1\" cellspacing=\"0\" cellpadding=\"2\" align=\"center\">")
        
        responseObj.forEach(user => {
            document.write("<tr>");
            document.write("<td>" + user.username + "</td>")
            document.write("<td>" + user.rating + "</td>")
            document.write("</tr>")
        })
        document.write("</table>")

        // for (i = 2; i <= 10; i++)
        // {document.write("<tr>");
        //     for (j = 2; j < 10; j++)
        //     {document.write("<td>" + "</td>")}
        // document.write("</tr>")
        // }
        // document.write("</table>")
        // } 
        }
    }

    window.ratingView = ratingView;
}());
