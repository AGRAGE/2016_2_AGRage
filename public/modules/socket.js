  (function() {
  'use strict';
  
    class Socket {

    constructor(){
        this.ws = new WebSocket(address);

        this.id = -1;
        this.players = {};

        this.connect();

    }


    connect() {
      this.ws.onopen = () => {
        console.log("Соединено");
        this.loop();
      };

      this.ws.onmessage = (event) => {
        const content = JSON.parse(event.data);
        const data = JSON.parse(content.data);

        switch (content.type) {
          case "InitializePlayer":
            this.id = data;
            break;
          case "Snapshot":
            if (data.shot) {
              console.log('В тебя попали');
              this.toggleGlick(0);
              setTimeout(() => { this.toggleGlick(1) }, 500)
            }

            data.players.forEach((player) => {
              const playerId = player.id;
              if (playerId == this.id) {
                return;
              }

              if (player.position == null) {
                console.log("Враг без координат");
                return;
              }

              const pp = player.position;

              if (this.players[`id${playerId}`] === undefined) {
                this.players[`id${playerId}`] = new WHS.Sphere({
                  geometry: {
                    radius: 3,
                    widthSegments: 32,
                    heightSegments: 32
                  },

                  mass: 2, // Mass of physics object.

                  material: {
                    color: UTILS.$colors.mesh,
                    kind: 'lambert'
                  },

                  position: pp,
                });

                this.players[`id${playerId}`].addTo(this.world);
              }
              else {
                this.players[`id${playerId}`].position.copy(pp);
              }
            });
            break;
          case "RemovePlayer":
            data.forEach((el) => {
              this.world.remove(this.players[`id${el}`]);
              delete this.players[`id${el}`]; //нужно поставить null
            });
            break;
        }
      };

      this.ws.onclose = (event) => {
        if (event.wasClean) {
          console.log('Соединение закрыто чисто');
        } else {
          console.log('Обрыв соединения');
        }
        console.log('Код: ' + event.code + ' причина: ' + event.reason);
        // вывод на экран сообщения о закрытии соединения
        window.header.innerText = 'Соединение закрыто';
        window.wrapper.hidden = true;
        id = -1;
      };

      this.ws.onerror = (error) => {
        console.log('Ошибка ' + error.message);
      };
    }
    //export
  window.Socket = Socket;
})();
