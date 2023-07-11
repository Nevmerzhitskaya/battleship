// import { mouse, left, up, down, right, Point } from "@nut-tree/nut-js";
import * as WebSocket from "ws";
import { httpServer } from ".";
import { ReceivedMessage, Types } from "../../src/models/models";
// import { Commands } from "../../src/app/constants";


export const socketConnection = async () => {
  const socket = new WebSocket.Server({ port: 3000 });

  socket.on('connection', async function connection(ws) {
    ws.on('message', async (data) => {
      const receivedData: ReceivedMessage = JSON.parse(data.toString());
      console.log('received: %s', receivedData);
      // console.log('parse data', JSON.parse(data.toString()));
      switch (receivedData.type) {
        case Types.reg: {
          console.log('Test Reg');
          break;
        }
        default: {
          ws.send('Connected');
          break;
        }
      }


      // switch (command) {
      //     case Commands.mouse_up: {
      //         await mouse.move(up(+value));
      //         sendData(ws, `${Commands.mouse_up}_${value}`);
      //         break;
      //     }
      //     case Commands.mouse_down: {
      //         await mouse.move(down(+value));
      //         sendData(ws, `${Commands.mouse_down}_${value}`);
      //         break;
      //     }
      //     case Commands.mouse_left: {
      //         await mouse.move(left(+value));
      //         sendData(ws, `${Commands.mouse_left}_${value}`);
      //         break;
      //     }
      //     case Commands.mouse_right: {
      //         await mouse.move(right(+value));
      //         sendData(ws, `${Commands.mouse_right}_${value}`);
      //         break;
      //     }
      //     case Commands.mouse_position: {
      //         const mousePosition = await mouse.getPosition();
      //         const string = `${Commands.mouse_position} {${mousePosition.x}},{${mousePosition.y}}`;

      //         sendData(ws, string);
      //         break;
      //     }
      //     case Commands.draw_square: {
      //         (async () => {
      //             await mouse.move(right(+value));
      //             await mouse.move(down(+value));
      //             await mouse.move(left(+value));
      //             await mouse.move(up(+value));
      //         })();

      //         const string = `${Commands.draw_square}_${value}`;

      //         sendData(ws, string);
      //         break;
      //     }
      //     case Commands.draw_rectangle: {
      //         (async () => {
      //             await mouse.move(right(+value));
      //             await mouse.move(down(+value2));
      //             await mouse.move(left(+value));
      //             await mouse.move(up(+value2));
      //         })();

      //         const string = `${Commands.draw_square}_${value}_${value2}`;

      //         sendData(ws, string);
      //         break;
      //     }
      //     case Commands.draw_circle: {
      //         const mousePosition = await mouse.getPosition();
      //         (async () => {
      //             const circleRadius = +value;
      //             let x = mousePosition.x;
      //             let y = mousePosition.y;
      //             const path: Point[] = [];
      //             for (var i = 0; i <= 100; i++) {
      //                 const a = 2 * Math.PI * i / 1000;
      //                 x = mousePosition.x + circleRadius * Math.cos(a);
      //                 y = mousePosition.y + circleRadius * Math.sin(a) + circleRadius;
      //                 // console.log();
      //                 path.push({ x, y })
      //             }
      //             await mouse.move(path);
      //         })();

      //         const string = `${Commands.draw_circle}_${value}`;

      //         sendData(ws, string);
      //         break;
      //     }
      //     default: {
      //         ws.send('Connected');
      //         break;
      //     }
      // }

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

// function sendData(ws: WebSocket.WebSocket, data: string) {

//   ws.send(data);
// }