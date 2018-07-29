import { ICity } from 'app/shared/model//city.model';

export interface IDistrict {
    id?: number;
    name?: string;
    city?: ICity;
}

export class District implements IDistrict {
    constructor(public id?: number, public name?: string, public city?: ICity) {}
}
