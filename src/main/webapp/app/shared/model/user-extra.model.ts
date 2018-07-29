import { IUser } from 'app/core/user/user.model';
import { IBankAccount } from 'app/shared/model//bank-account.model';
import { IImage } from 'app/shared/model//image.model';

export interface IUserExtra {
    id?: number;
    phone?: string;
    user?: IUser;
    bank?: IBankAccount;
    image?: IImage;
}

export class UserExtra implements IUserExtra {
    constructor(public id?: number, public phone?: string, public user?: IUser, public bank?: IBankAccount, public image?: IImage) {}
}
