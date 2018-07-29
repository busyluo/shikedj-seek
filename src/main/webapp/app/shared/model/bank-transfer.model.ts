import { Moment } from 'moment';
import { IBankAccount } from 'app/shared/model//bank-account.model';
import { IUserExtra } from 'app/shared/model//user-extra.model';

export interface IBankTransfer {
    id?: number;
    time?: Moment;
    amount?: number;
    bank?: IBankAccount;
    user?: IUserExtra;
}

export class BankTransfer implements IBankTransfer {
    constructor(public id?: number, public time?: Moment, public amount?: number, public bank?: IBankAccount, public user?: IUserExtra) {}
}
