import { IImage } from 'app/shared/model//image.model';
import { ICuisine } from 'app/shared/model//cuisine.model';

export interface IDish {
    id?: number;
    name?: string;
    price?: number;
    images?: IImage[];
    cuisine?: ICuisine;
}

export class Dish implements IDish {
    constructor(public id?: number, public name?: string, public price?: number, public images?: IImage[], public cuisine?: ICuisine) {}
}
