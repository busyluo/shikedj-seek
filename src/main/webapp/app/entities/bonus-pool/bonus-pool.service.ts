import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBonusPool } from 'app/shared/model/bonus-pool.model';

type EntityResponseType = HttpResponse<IBonusPool>;
type EntityArrayResponseType = HttpResponse<IBonusPool[]>;

@Injectable({ providedIn: 'root' })
export class BonusPoolService {
    private resourceUrl = SERVER_API_URL + 'api/bonus-pools';

    constructor(private http: HttpClient) {}

    create(bonusPool: IBonusPool): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(bonusPool);
        return this.http
            .post<IBonusPool>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(bonusPool: IBonusPool): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(bonusPool);
        return this.http
            .put<IBonusPool>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IBonusPool>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBonusPool[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(bonusPool: IBonusPool): IBonusPool {
        const copy: IBonusPool = Object.assign({}, bonusPool, {
            date: bonusPool.date != null && bonusPool.date.isValid() ? bonusPool.date.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((bonusPool: IBonusPool) => {
            bonusPool.date = bonusPool.date != null ? moment(bonusPool.date) : null;
        });
        return res;
    }
}
