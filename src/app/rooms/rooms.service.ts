import { ErrorMessage, StatusCode } from '../constants';
import { CustomError } from '../exception';
import { RoomInfo, UserInfo } from '../../models/models';
import { rooms } from '../../db/db';
import exp from 'constants';

export const addRoom = async () => {
    // if (!(obj?.name && obj.name != null && typeof obj.name === 'string')) throw ErrorMessage.ERROR_VALIDATION;
    // if (!(obj?.password && obj.password != null && typeof obj.password === 'string')) throw ErrorMessage.ERROR_VALIDATION;
    // let rooms = await getRooms();
    // if(user) return user;
    // user = obj;
    // user.index = users.length + 1;

    // users.push(user);
    const room = new RoomInfo(rooms.length + 1);

    rooms.push(room);
    // return rooms;
}

export const getRooms = async () => {
  const freeRooms = rooms.find(room => room.roomUsers.length === 1);
  return freeRooms;
}
// export const getUser = async (userInfo: UserInfo) => {    
//     const user = users.find(user => user.name === userInfo.name);
//     if (user && user.password != userInfo.password) throw ErrorMessage.INVALID_USER_PSWRD;
//     return user;
// }
