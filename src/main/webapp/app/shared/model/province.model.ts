import { ICity } from 'app/shared/model//city.model';

export interface IProvince {
    id?: number;
    name?: string;
    cities?: ICity[];
}

export class Province implements IProvince {
    constructor(public id?: number, public name?: string, public cities?: ICity[]) {}
}
