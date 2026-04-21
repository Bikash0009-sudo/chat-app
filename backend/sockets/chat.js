let waitingUsers = [];
let activeChats = {};

export default function oneToOneChat(io, socket) {

  function pairUsers() {
    while (waitingUsers.length >= 2) {
      const u1 = waitingUsers.shift();
      const u2 = waitingUsers.shift();

      if (u1 === u2) continue;

      activeChats[u1] = u2;
      activeChats[u2] = u1;

      io.to(u1).emit("connected");
      io.to(u2).emit("connected");
    }
  }

  function disconnectUser() {
    const partner = activeChats[socket.id];

    if (partner) {
      io.to(partner).emit("userDisconnected");
      delete activeChats[partner];
    }

    delete activeChats[socket.id];
  }

  // join chat
  socket.on("joinChat", () => {
    if (!waitingUsers.includes(socket.id)) {
      waitingUsers.push(socket.id);
    }

    socket.emit("searching");
    pairUsers();
  });

  // next user
  socket.on("nextUser", () => {
    disconnectUser();

    socket.emit("searching");

    if (!waitingUsers.includes(socket.id)) {
      waitingUsers.push(socket.id);
    }

    pairUsers();
  });

  // message
  socket.on("chatMessage", (msg) => {
    const partner = activeChats[socket.id];
    if (partner) {
      io.to([socket.id, partner]).emit("chatMessage", msg);
    }
  });

  socket.on("disconnect", () => {
    disconnectUser();
    waitingUsers = waitingUsers.filter(id => id !== socket.id);
  });
}