import { IRestaurant } from 'app/shared/model//restaurant.model';
import { IDish } from 'app/shared/model//dish.model';

export interface IImage {
    id?: number;
    url?: string;
    name?: string;
    restaurant?: IRestaurant;
    dish?: IDish;
}

export class Image implements IImage {
    constructor(public id?: number, public url?: string, public name?: string, public restaurant?: IRestaurant, public dish?: IDish) {}
}
