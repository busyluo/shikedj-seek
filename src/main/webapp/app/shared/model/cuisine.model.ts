import { IDish } from 'app/shared/model//dish.model';
import { IRestaurant } from 'app/shared/model//restaurant.model';

export interface ICuisine {
    id?: number;
    name?: string;
    dishes?: IDish[];
    restaurant?: IRestaurant;
}

export class Cuisine implements ICuisine {
    constructor(public id?: number, public name?: string, public dishes?: IDish[], public restaurant?: IRestaurant) {}
}
