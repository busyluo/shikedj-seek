import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISealedBonus } from 'app/shared/model/sealed-bonus.model';

type EntityResponseType = HttpResponse<ISealedBonus>;
type EntityArrayResponseType = HttpResponse<ISealedBonus[]>;

@Injectable({ providedIn: 'root' })
export class SealedBonusService {
    private resourceUrl = SERVER_API_URL + 'api/sealed-bonuses';

    constructor(private http: HttpClient) {}

    create(sealedBonus: ISealedBonus): Observable<EntityResponseType> {
        return this.http.post<ISealedBonus>(this.resourceUrl, sealedBonus, { observe: 'response' });
    }

    update(sealedBonus: ISealedBonus): Observable<EntityResponseType> {
        return this.http.put<ISealedBonus>(this.resourceUrl, sealedBonus, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISealedBonus>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISealedBonus[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
