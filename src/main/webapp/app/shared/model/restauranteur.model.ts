import { IUserExtra } from 'app/shared/model//user-extra.model';
import { IRestaurant } from 'app/shared/model//restaurant.model';

export interface IRestauranteur {
    id?: number;
    user?: IUserExtra;
    restaurants?: IRestaurant[];
}

export class Restauranteur implements IRestauranteur {
    constructor(public id?: number, public user?: IUserExtra, public restaurants?: IRestaurant[]) {}
}
