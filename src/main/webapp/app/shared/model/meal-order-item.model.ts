import { IDish } from 'app/shared/model//dish.model';
import { IMealOrder } from 'app/shared/model//meal-order.model';

export interface IMealOrderItem {
    id?: number;
    amount?: number;
    dish?: IDish;
    order?: IMealOrder;
}

export class MealOrderItem implements IMealOrderItem {
    constructor(public id?: number, public amount?: number, public dish?: IDish, public order?: IMealOrder) {}
}
