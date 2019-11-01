export default (container) => {
  let socketIoServer;
  const init = (httpServer) => {
    socketIoServer = container.socketIO(httpServer, {
      path: '/ws-connect/',
    });

    // Handle Events
    socketIoServer.on('connection', () => console.log('A socket is connected'));
  };

  return {
    init,
  };
};
