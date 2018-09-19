const resolveWhen = require('resolve-when');
const attachStateManager = require('./attach-state-manager');

class CucumberSocket {
  constructor() {
    this.sockets = {};
  }

  register(socket) {
    // Wait for socket to connect
    return resolveWhen(() => socket.connected === true)
      .then(() => {
        this.sockets[socket.id] = {
          trigger: {},
          requests: [],
          responses: [],
        };
        return attachStateManager(this, socket);
      });
  }

  trigger(socket, type) {
    this.sockets[socket.id].trigger[type] && this.sockets[socket.id].trigger[type].forEach(fn => fn());
    this.sockets[socket.id].trigger[type] = [];
  }

  waitFor(socket, type, callback) {
    if (!this.sockets[socket.id].trigger[type]) {
      this.sockets[socket.id].trigger[type] = [callback];
    } else {
      this.sockets[socket.id].trigger[type].push(callback);
    }
  }
}

module.exports = CucumberSocket;
