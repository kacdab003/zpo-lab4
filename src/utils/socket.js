exports.executeEmit = (socket, emitData) => socket.emit(emitData.event, emitData.data);
