import { IRestaurant } from 'app/shared/model//restaurant.model';

export interface IRestaurantType {
    id?: number;
    type?: string;
    restaurants?: IRestaurant[];
}

export class RestaurantType implements IRestaurantType {
    constructor(public id?: number, public type?: string, public restaurants?: IRestaurant[]) {}
}
