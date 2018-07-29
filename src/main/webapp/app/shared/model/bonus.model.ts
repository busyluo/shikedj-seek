import { IMealOrder } from 'app/shared/model//meal-order.model';
import { ICustomer } from 'app/shared/model//customer.model';

export interface IBonus {
    id?: number;
    amount?: number;
    order?: IMealOrder;
    customer?: ICustomer;
}

export class Bonus implements IBonus {
    constructor(public id?: number, public amount?: number, public order?: IMealOrder, public customer?: ICustomer) {}
}
