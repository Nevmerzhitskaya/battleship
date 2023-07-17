export class Message {
  type = '';
  data = '';
  id: number;

  constructor() {
    this.id = 0;
  }
}

export class UserInfo {
  name = '';
  password = '';
  index = 0;
  error = false;
  errorText = '';

}

export class RoomInfo {
  roomId: number;
  roomUsers: Array<RoomUser>;

  constructor(roomId: number) {
    this.roomUsers = [];
    this.roomId = roomId;
  }
}

export class RoomUser {
  name: string;
  index: number;
  
  constructor(name: string, index: number) {
    this.name = name;
    this.index = index;
  }
}

export const enum Types {
  reg = 'reg',
  update_winners = 'update_winners',
  create_room = 'create_room',
  add_user_to_room = 'add_user_to_room',
  create_game = 'create_game',
  update_room = 'update_room',
  add_ships = 'add_ships',
  start_game = 'start_game',
  attack = 'attack',
  randomAttack = 'randomAttack',
  turn = 'turn',
  finish = 'finish'
}
