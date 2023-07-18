import { ErrorMessage, StatusCode } from '../constants';
import { CustomError } from '../exception';
import { RoomInfo, RoomUser, UserInfo } from '../../models/models';
import { rooms } from '../../db/db';
import exp from 'constants';

export const addRoom = async (userInfo: UserInfo) => {
    const room = new RoomInfo(rooms.length + 1);
    room.roomId = rooms.length + 1;
    const user = new RoomUser(userInfo.name, userInfo.index);
    room.roomUsers.push(user)
    rooms.push(room);

    return rooms;
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
