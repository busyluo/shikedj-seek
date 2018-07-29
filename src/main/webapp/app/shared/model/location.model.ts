import { IDistrict } from 'app/shared/model//district.model';

export interface ILocation {
    id?: number;
    streetAddr?: string;
    district?: IDistrict;
}

export class Location implements ILocation {
    constructor(public id?: number, public streetAddr?: string, public district?: IDistrict) {}
}
