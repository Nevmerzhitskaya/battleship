export interface ReceivedMessage {
  type: string;
  data: UserInfo;
  id: number;
}

export interface UserInfo {
  name: string;
  password: string;
}

export interface UserInfoError {
  name: string;
  index: number;
  error: boolean;
  errorText: string;
}

export const enum Types {
  reg = 'reg',
  update_winners = 'update_winners',
  create_room = 'create_room',
  add_player_to_room = 'add_player_to_room',
  create_game = 'create_game',
  update_room = 'update_room',
  add_ships = 'add_ships',
  start_game = 'start_game',
  attack = 'attack',
  randomAttack = 'randomAttack',
  turn = 'turn',
  finish = 'finish'
}