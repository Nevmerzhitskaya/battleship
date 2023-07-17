
import * as WebSocket from "ws";
import { Message, RoomInfo, Types, UserInfo } from "../models/models";
import { addUser } from "../app/users/users.service";
import { addRoom } from "../app/rooms/rooms.service";

function sendData(client: WebSocket.WebSocket, data: Message) {
  client.send(JSON.stringify(data));
}


export const registration = async (ws: WebSocket.WebSocket, data: UserInfo) => {

  const sendMessage = new Message();
  try {
    const user: UserInfo = await addUser(data);
    sendMessage.type = Types.reg;
    sendMessage.data = JSON.stringify(user);
    sendData(ws, sendMessage);

  } catch (error: any) {
    const user = data;

    user.error = true;
    user.errorText = error;

    sendMessage.type = Types.reg;
    sendMessage.data = JSON.stringify(user);
    sendData(ws, sendMessage);
  }
}


export const createRoom = async (ws: WebSocket.WebSocket) => {

  const sendMessage = new Message();
  try {
    const room: RoomInfo = await addRoom();
    sendMessage.type = Types.update_room;
    // sendMessage.data = JSON.stringify(user);
    // sendData(ws, sendMessage);

  } catch (error: any) {
    // const user = data;

    // user.error = true;
    // user.errorText = error;

    // sendMessage.type = Types.reg;
    // sendMessage.data = JSON.stringify(user);
    // sendData(ws, sendMessage);
  }
}