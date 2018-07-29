import { IUserExtra } from 'app/shared/model//user-extra.model';
import { IBonus } from 'app/shared/model//bonus.model';
import { ISealedBonus } from 'app/shared/model//sealed-bonus.model';

export interface ICustomer {
    id?: number;
    openID?: string;
    point?: number;
    user?: IUserExtra;
    bonuses?: IBonus[];
    sealedBonuses?: ISealedBonus[];
}

export class Customer implements ICustomer {
    constructor(
        public id?: number,
        public openID?: string,
        public point?: number,
        public user?: IUserExtra,
        public bonuses?: IBonus[],
        public sealedBonuses?: ISealedBonus[]
    ) {}
}
