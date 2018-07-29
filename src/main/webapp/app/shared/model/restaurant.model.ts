import { Moment } from 'moment';
import { ILocation } from 'app/shared/model//location.model';
import { IMealTable } from 'app/shared/model//meal-table.model';
import { IImage } from 'app/shared/model//image.model';
import { ICuisine } from 'app/shared/model//cuisine.model';
import { IMealOrder } from 'app/shared/model//meal-order.model';
import { IRestaurantType } from 'app/shared/model//restaurant-type.model';
import { IAgentArea } from 'app/shared/model//agent-area.model';
import { IRestauranteur } from 'app/shared/model//restauranteur.model';

export interface IRestaurant {
    id?: number;
    name?: string;
    openTime?: Moment;
    closeTime?: Moment;
    phone?: string;
    location?: ILocation;
    tables?: IMealTable[];
    photos?: IImage[];
    cuisines?: ICuisine[];
    orders?: IMealOrder[];
    types?: IRestaurantType[];
    area?: IAgentArea;
    owner?: IRestauranteur;
}

export class Restaurant implements IRestaurant {
    constructor(
        public id?: number,
        public name?: string,
        public openTime?: Moment,
        public closeTime?: Moment,
        public phone?: string,
        public location?: ILocation,
        public tables?: IMealTable[],
        public photos?: IImage[],
        public cuisines?: ICuisine[],
        public orders?: IMealOrder[],
        public types?: IRestaurantType[],
        public area?: IAgentArea,
        public owner?: IRestauranteur
    ) {}
}
