import { Moment } from 'moment';
import { IMealOrderItem } from 'app/shared/model//meal-order-item.model';
import { IRestaurant } from 'app/shared/model//restaurant.model';

export const enum MealOrderType {
    NORMAL = 'NORMAL',
    APPOINTMENT = 'APPOINTMENT'
}

export const enum MealOrderStatus {
    CREATED = 'CREATED',
    APPOINTMENT_CREATED = 'APPOINTMENT_CREATED',
    APPOINTMENT_PAID = 'APPOINTMENT_PAID',
    APPOINTMENT_PAID_BUT_NO_TABLE = 'APPOINTMENT_PAID_BUT_NO_TABLE',
    OPENED = 'OPENED',
    CHECKOUT = 'CHECKOUT'
}

export interface IMealOrder {
    id?: number;
    time?: Moment;
    type?: MealOrderType;
    status?: MealOrderStatus;
    pointUsage?: number;
    paidAmount?: number;
    actualPay?: number;
    totalPrice?: number;
    dishes?: IMealOrderItem[];
    restaurant?: IRestaurant;
}

export class MealOrder implements IMealOrder {
    constructor(
        public id?: number,
        public time?: Moment,
        public type?: MealOrderType,
        public status?: MealOrderStatus,
        public pointUsage?: number,
        public paidAmount?: number,
        public actualPay?: number,
        public totalPrice?: number,
        public dishes?: IMealOrderItem[],
        public restaurant?: IRestaurant
    ) {}
}
