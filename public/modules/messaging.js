(function() {
	'use strict'

	class MessagingTools {
		constructor(socket) {
			this.socket = socket;
		}

		sendMyTestMessage() {
			let myTestMessage = {};
			myTestMessage.type = "ru.mail.park.websocket.TestMessage$Request";
			myTestMessage.content = "{}";
			this.socket.send(JSON.stringify(myTestMessage));
		}

		sendTrollCoord() {
			let getPingMessage = {};
			getPingMessage.type = "ru.agrage.project.Mechanics.Requests;";
			getPingMessage.content = "{}";
			this.socket.send(JSON.stringify(getPingMessage));
		};


		/*let TowerHpMessage = {}
          TowerHpMessage.type ="ru.agrage.project.Mechanics.Requests;";
          TowerHpMessage.content = JSON.stringify(tower);
		  console.log(this.socket.send);
          this.socket.send(JSON.stringify(TowerHpMessage));*/
		towerSend(tower) {
			let towerHpMessage = {};
			towerHpMessage.type = "ru.agrage.project.Mechanics.Requests;";
			towerHpMessage.content = JSON.stringify(tower);
			this.socket.send(JSON.stringify(towerHpMessage));
		}

		newSend(tower) {
			if (this.socket.readyState === 1) {
				console.log("Connection is made");
				this.towerSend(tower);
				clearInterval(this.timerId);
			} else {
				console.log("wait for connection...");
			}
		}

		/*waitForSocketConnection(callback) {
			setTimeout(this.newSend(callback).bind(this), 1000); // wait 5 milisecond for the connection...
		}*/

		TowerHpMessage(tower) {
			// Wait until the state of the socket is not ready and send the message when it is...
			this.timerId = setInterval(this.newSend.bind(this, tower), 2000);

			/*this.waitForSocketConnection(function() {
					console.log("message sent!!!");
					let towerHpMessage = {};
					towerHpMessage.type = "ru.agrage.project.Mechanics.Requests;";
					towerHpMessage.content = JSON.stringify(tower);
					console.log(this.socket.send);
					this.socket.send(JSON.stringify(towerHpMessage));
				})
				/*while (this.socket.readyState !== 1) {
				console.log(this.socket.readyState);
			};
			TowerHpMessage.type = "ru.agrage.project.Mechanics.Requests;";
			TowerHpMessage.content = JSON.stringify(tower);
			console.log(this.socket.send);
			this.socket.send(JSON.stringify(TowerHpMessage));
*/
		};

		// Make the function wait until the connection is made...


		// sendClientSnap(snap) {
		//   let clientSnapMessage = {};
		//   clientSnapMessage.type = "ru.mail.park.mechanics.base.ClientSnap";
		//   clientSnapMessage.content = JSON.stringify(snap);
		//   this.socket.send(JSON.stringify(clientSnapMessage));
		// };

		// sendPiratMove(piratMove){
		//   let clientPiratMoveMessage = {};
		//   clientPiratMoveMessage.type = "ru.mail.park.mechanics.requests.PiratMoveRequest";
		//   clientPiratMoveMessage.content = JSON.stringify(piratMove);
		//   console.log(JSON.stringify("Эгегей, сервер, подвинь мне пирата"));
		//   this.socket.send(JSON.stringify(clientPiratMoveMessage));
		// }

		// sendShipMove(shipMove){
		//   let clientShipMoveMessage = {};
		//   clientShipMoveMessage.type = "ru.mail.park.mechanics.requests.ShipMoveRequest";
		//   clientShipMoveMessage.content = JSON.stringify(shipMove);
		//   this.socket.send(JSON.stringify(clientShipMoveMessage));
		// }

		// sendGetNeighbors(cellID){
		//   let clientCellMessage = {};
		//   clientCellMessage.type = "ru.mail.park.mechanics.requests.GetNeighbors";
		//   clientCellMessage.content = JSON.stringify(cellID);
		//   console.log(JSON.stringify(clientCellMessage));
		//   this.socket.send(JSON.stringify(clientCellMessage));
		//   console.log('Отправлен запрос на получение смежных клеток...');
		// }
	}

	window.MessagingTools = MessagingTools;

})();
