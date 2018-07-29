import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDistrict } from 'app/shared/model/district.model';

type EntityResponseType = HttpResponse<IDistrict>;
type EntityArrayResponseType = HttpResponse<IDistrict[]>;

@Injectable({ providedIn: 'root' })
export class DistrictService {
    private resourceUrl = SERVER_API_URL + 'api/districts';

    constructor(private http: HttpClient) {}

    create(district: IDistrict): Observable<EntityResponseType> {
        return this.http.post<IDistrict>(this.resourceUrl, district, { observe: 'response' });
    }

    update(district: IDistrict): Observable<EntityResponseType> {
        return this.http.put<IDistrict>(this.resourceUrl, district, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDistrict>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDistrict[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
