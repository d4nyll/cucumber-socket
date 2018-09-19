/* eslint no-param-reassign: ["error", {
  "props": true, "ignorePropertyModificationsFor": ["socket"] }] */

/**
 * Modifies socket to include a catch-all event to all events
 * N.B. Modifies socket object
 */
function attachStateManager(stateManager, socket) {
  const { onevent } = socket;
  socket.onevent = function (packet) {
    onevent.call(this, packet);
    stateManager.trigger.call(stateManager, socket, packet.data[0]); // packet.data is an array, where the first item is the type
  };
  return socket;
}

module.exports = attachStateManager;
