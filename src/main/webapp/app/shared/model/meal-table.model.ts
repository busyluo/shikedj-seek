import { IRestaurant } from 'app/shared/model//restaurant.model';

export const enum TableType {
    SMALL = 'SMALL',
    MEDIUM = 'MEDIUM',
    BIG = 'BIG'
}

export const enum TableStatus {
    SPARE = 'SPARE',
    OCCUPIED = 'OCCUPIED',
    SUSPENDED = 'SUSPENDED'
}

export interface IMealTable {
    id?: number;
    type?: TableType;
    status?: TableStatus;
    restaurant?: IRestaurant;
}

export class MealTable implements IMealTable {
    constructor(public id?: number, public type?: TableType, public status?: TableStatus, public restaurant?: IRestaurant) {}
}
