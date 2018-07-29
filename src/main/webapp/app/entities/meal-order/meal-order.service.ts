import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMealOrder } from 'app/shared/model/meal-order.model';

type EntityResponseType = HttpResponse<IMealOrder>;
type EntityArrayResponseType = HttpResponse<IMealOrder[]>;

@Injectable({ providedIn: 'root' })
export class MealOrderService {
    private resourceUrl = SERVER_API_URL + 'api/meal-orders';

    constructor(private http: HttpClient) {}

    create(mealOrder: IMealOrder): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(mealOrder);
        return this.http
            .post<IMealOrder>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(mealOrder: IMealOrder): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(mealOrder);
        return this.http
            .put<IMealOrder>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IMealOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMealOrder[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(mealOrder: IMealOrder): IMealOrder {
        const copy: IMealOrder = Object.assign({}, mealOrder, {
            time: mealOrder.time != null && mealOrder.time.isValid() ? mealOrder.time.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.time = res.body.time != null ? moment(res.body.time) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((mealOrder: IMealOrder) => {
            mealOrder.time = mealOrder.time != null ? moment(mealOrder.time) : null;
        });
        return res;
    }
}
