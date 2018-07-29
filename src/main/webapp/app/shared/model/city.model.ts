import { IDistrict } from 'app/shared/model//district.model';
import { IProvince } from 'app/shared/model//province.model';

export interface ICity {
    id?: number;
    name?: string;
    districts?: IDistrict[];
    province?: IProvince;
}

export class City implements ICity {
    constructor(public id?: number, public name?: string, public districts?: IDistrict[], public province?: IProvince) {}
}
