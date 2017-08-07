//  var socket = new WebSocket('ws://127.0.0.1:3002/updates');
// socket.onopen = function () {
// 	sendData = function(data){
// 		socket.send(data)
// 	}
// 	socket.onmessage = function(event) {
//     console.log(event)
// 		// var data = JSON.parse(event.data)
// 	}
// 	socket.onclose = function(event) {
// 		console.log('连接被关闭')
// 	};
// 	socket.onerr = function(err) {
// 		console.log(err)
// 	}
//   setTimeout(function() {
//     console.log('send sth')
//     sendData('helloworld')
//   }, 2000)
// };
class Ws {
  constructor() {
    this.socket = new WebSocket('ws://127.0.0.1:3002/ws_connect');
    this.errorListener = [];
    this.closeListener = [];
    this.messageListener = [];
    this.socket.onmessage = (event) => {
      for (let i in this.messageListener) {
        this.messageListener[i](event.data);
      }
    }
  }

  send(msg) {
    this.socket.send(msg);
  }

  setMessageListener(func) {
    this.messageListener.push(func);
  }

  setErrorListener(func) {
  }
}

//单例
module.exports = new Ws()