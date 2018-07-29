import { IUserExtra } from 'app/shared/model//user-extra.model';

export interface IAdmin {
    id?: number;
    user?: IUserExtra;
}

export class Admin implements IAdmin {
    constructor(public id?: number, public user?: IUserExtra) {}
}
