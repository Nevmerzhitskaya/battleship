import { ErrorMessage, StatusCode } from '../constants';
import { CustomError } from '../exception';
import { UserInfo } from '../../models/models';
import { users } from '../../db/db';

export const addUser = async (obj: UserInfo) => {
    if (!(obj?.name && obj.name != null && typeof obj.name === 'string')) throw ErrorMessage.ERROR_VALIDATION;
    if (!(obj?.password && obj.password != null && typeof obj.password === 'string')) throw ErrorMessage.ERROR_VALIDATION;
    let user = await getUser(obj);
    if(user) return user;
    user = obj;
    user.index = users.length + 1;

    users.push(user);

    return user;
}


export const getUser = async (userInfo: UserInfo) => {    
    const user = users.find(user => user.name === userInfo.name);
    if (user && user.password != userInfo.password) throw ErrorMessage.INVALID_USER_PSWRD;
    return user;
}
