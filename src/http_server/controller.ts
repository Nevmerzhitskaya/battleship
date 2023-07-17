// import { mouse, left, up, down, right, Point } from "@nut-tree/nut-js";
import * as WebSocket from "ws";
import { httpServer } from ".";
import { Message, RoomUser, Types, UserInfo } from "../../src/models/models";
import { addUser } from "../app/users/users.service";
import { addShips, addUserToRoom, createRoom, registration } from "./server.service";
import { v4 as uuidv4 } from 'uuid';
import { rooms } from "../db/db";
// import { Commands } from "../../src/app/constants";
const clients = new Map<WebSocket.WebSocket, number>();


export const socketConnection = async () => {
  const socket = new WebSocket.Server({ port: 3000 });

  socket.on('connection', async function connection(ws) {

    // clients.add(ws);
    console.log("New client!");


    ws.on('message', async (msg) => {
      const msgObj: Message = JSON.parse(msg.toString());
      console.log('DATA ', msgObj);

      // const id = uuidv4();
      // const color = Math.floor(Math.random() * 360);
      if (msgObj.type === Types.reg) {
        const data: UserInfo = JSON.parse(msgObj.data.toString());
        registration(socket, clients, ws, data);

      }

      if (msgObj.type === Types.create_room) {
        createRoom(socket, clients, ws);
      }

      if (msgObj.type === Types.add_user_to_room) {

        const data = JSON.parse(msgObj.data.toString());
        console.log('add_user_to_room');
        addUserToRoom(socket, clients, ws, data);
      }

      if (msgObj.type === Types.add_ships) {

        const data = JSON.parse(msgObj.data.toString());
        console.log('add_ships');
        addShips(socket, clients, ws, data);
      }



    });

    ws.on('close', () => {
      ws.send('connection closed');
      clients.delete(ws);
      console.log(`connection closed`);
    });

    ws.on('error', (err) => {
      console.log(`Error occurred: ${err.message}`);
    });

  });




  process.on('SIGINT', () => {
    socket.close();
    socket.clients.forEach((client) => {
      client.close();
    });
    httpServer.close();
    httpServer.closeAllConnections();
    console.log('\nClose http and websocket servers!');
    process.exit();
  });
}




// function sendData(client: WebSocket.WebSocket, data: Message) {
//   client.send(JSON.stringify(data));
// }


// const registration = async (ws: WebSocket.WebSocket, data: UserInfo) => {

//   const sendMessage = new Message();
//   try {
//     const user: UserInfo = await addUser(data);
//     sendMessage.type = Types.reg;
//     sendMessage.data = JSON.stringify(user);
//     sendData(ws, sendMessage);

//   } catch (error: any) {
//     const user = data;

//     user.error = true;
//     user.errorText = error;

//     sendMessage.type = Types.reg;
//     sendMessage.data = JSON.stringify(user);
//     sendData(ws, sendMessage);
//   }
// }