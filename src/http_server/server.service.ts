
import * as WebSocket from "ws";
import { Message, RoomInfo, RoomUser, Types, UserInfo } from "../models/models";
import { addUser } from "../app/users/users.service";
import { addRoom } from "../app/rooms/rooms.service";
import { rooms, users } from "../db/db";

function sendData(client: WebSocket.WebSocket, data: Message) {
  client.send(JSON.stringify(data));
}

let userInfo = new UserInfo();

export const registration = async (socket: WebSocket.Server, clients: Map<WebSocket.WebSocket, number>, ws: WebSocket.WebSocket, data: UserInfo) => {

  const sendMessage = new Message();
  try {
    const user: UserInfo = await addUser(data);
    // userInfo = user;
    sendMessage.type = Types.reg;
    sendMessage.data = JSON.stringify(user);

    clients.set(ws, user.index);
    sendData(ws, sendMessage);
    updateRoom(socket, clients,  ws);
    return user;

  } catch (error: any) {
    const user = data;

    user.error = true;
    user.errorText = error;

    sendMessage.type = Types.reg;
    sendMessage.data = JSON.stringify(user);
    sendData(ws, sendMessage);
  }
}


export const createRoom = async (socket: WebSocket.Server, clients: Map<WebSocket.WebSocket, number>, ws: WebSocket.WebSocket) => {

  try {
    const id = clients.get(ws);
    let userInfo = users.find(user => user.index === id) as UserInfo;
    console.log(userInfo);
    await addRoom(userInfo);
    updateRoom(socket, clients,  ws);
  } catch (error: any) {
  }
}

export const updateRoom = (socket: WebSocket.Server, clients: Map<WebSocket.WebSocket, number>,  ws: WebSocket.WebSocket) => {
  const sendMessage = new Message();

  const id = clients.get(ws);

  const availableRoom = rooms.filter(room => room.roomUsers.length < 2 && !room.roomUsers.find(user=> user.index === id));
  sendMessage.type = Types.update_room;
  sendMessage.data = JSON.stringify(availableRoom);

  socket.clients.forEach(async client => {
    if (client === ws && client.readyState === WebSocket.OPEN) {
      sendData(client, sendMessage);
    }
  });
}

export const addUserToRoom = (socket: WebSocket.Server, clients: Map<WebSocket.WebSocket, number>,  ws: WebSocket.WebSocket, data: { indexRoom: number }) => {

  const id = clients.get(ws);
  let userInfo = users.find(user => user.index === id) as UserInfo;
  let room = rooms.find(room => room.roomId === data.indexRoom) as RoomInfo;
  console.log(rooms);
  if (room) room.roomUsers.push({name: userInfo.name, index: userInfo.index});
  updateRoom(socket, clients,  ws);
  createGame(socket, clients, ws, room);
}

export const createGame = (socket: WebSocket.Server, clients: Map<WebSocket.WebSocket, number>,  ws: WebSocket.WebSocket, room: RoomInfo) => {
  const sendMessage = new Message();

  // const id = clients.get(ws);

  // const availableRoom = rooms.filter(room => room.roomUsers.length < 2 && !room.roomUsers.find(user=> user.index === id));
  sendMessage.type = Types.start_game;
  // sendMessage.data = JSON.stringify(availableRoom);  
}