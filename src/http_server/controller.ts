// import { mouse, left, up, down, right, Point } from "@nut-tree/nut-js";
import * as WebSocket from "ws";
import { httpServer } from ".";
import { Message, Types, UserInfo } from "../../src/models/models";
import { addUser } from "../app/users/users.service";
import { createRoom, registration } from "./server.service";
// import { Commands } from "../../src/app/constants";
const clients = new Set();


export const socketConnection = async () => {
  const socket = new WebSocket.Server({ port: 3000 });

  socket.on('connection', async function connection(ws) {

    clients.add(ws);
    console.log("New client!");


    ws.on('message', async (msg) => {
      const msgObj: Message  = JSON.parse(msg.toString());
      console.log('DATA ', msgObj);

      if (msgObj.type === Types.reg) {
        const data: UserInfo = JSON.parse(msgObj.data.toString());
        registration(ws, data);
      }

      if (msgObj.type === Types.create_room) {
        createRoom(ws);
      }      
      // socket.clients.forEach(async client => {
      //   if (client !== ws && client.readyState === WebSocket.OPEN) {

      //   }
      // });



    });

    ws.on('close', () => {
      ws.send('connection closed');
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