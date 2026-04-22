// ✅ Store full user info (NOT just true)
const users = {};

export default function roomChat(io, socket) {
  console.log("Room socket connected:", socket.id);

  // ✅ JOIN ROOM
  socket.on("joinRoom", (roomId, username) => {
    console.log("JOIN:", socket.id, roomId, username);

    // prevent duplicate join
    if (users[socket.id]) return;

    // store user data
    users[socket.id] = { roomId, username };

    socket.join(roomId);

    // notify others
    socket.to(roomId).emit("roomMessage", {
      user: "System",
      text: `${username} joined`,
    });
  });

  // ✅ SEND MESSAGE
  socket.on("roomMessage", ({ roomId, username, message }) => {
    if (!message?.trim()) return;

    console.log("MSG:", username, message);

    io.to(roomId).emit("roomMessage", {
      user: username,
      text: message,
    });
  });

  // ✅ TYPING START
  socket.on("typing", ({ roomId, username }) => {
    socket.to(roomId).emit("typing", username);
  });

  // ✅ TYPING STOP
  socket.on("stopTyping", ({ roomId }) => {
    socket.to(roomId).emit("stopTyping");
  });

  // ✅ DISCONNECT
  socket.on("disconnect", () => {
    const user = users[socket.id];

    if (user) {
      const { roomId, username } = user;

      // notify others
      socket.to(roomId).emit("roomMessage", {
        user: "System",
        text: `${username} left`,
      });

      delete users[socket.id];
    }

    console.log("Disconnected:", socket.id);
  });
}