import { IMealOrder } from 'app/shared/model//meal-order.model';
import { ICustomer } from 'app/shared/model//customer.model';

export interface ISealedBonus {
    id?: number;
    progress?: number;
    amount?: number;
    order?: IMealOrder;
    customer?: ICustomer;
}

export class SealedBonus implements ISealedBonus {
    constructor(
        public id?: number,
        public progress?: number,
        public amount?: number,
        public order?: IMealOrder,
        public customer?: ICustomer
    ) {}
}
