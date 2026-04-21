// move OUTSIDE function
const joinedUsers = {};

export default function roomChat(io, socket) {

  console.log("Room socket connected:", socket.id);

  socket.on("joinRoom", (roomId, username) => {
    console.log("JOIN:", socket.id, roomId, username);

    if (joinedUsers[socket.id]) return;

    joinedUsers[socket.id] = true;

    socket.join(roomId);

    socket.to(roomId).emit("roomMessage", {
      user: "System",
      text: `${username} joined`,
    });
  });

  socket.on("roomMessage", ({ roomId, username, message }) => {
    console.log("MSG RECEIVED:", message);

    io.to(roomId).emit("roomMessage", {
      user: username,
      text: message,
    });
  });

  socket.on("disconnect", () => {
    delete joinedUsers[socket.id];
    console.log("Disconnected:", socket.id);
  });
}