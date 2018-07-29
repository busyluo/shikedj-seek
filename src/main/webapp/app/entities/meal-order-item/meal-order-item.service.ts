import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMealOrderItem } from 'app/shared/model/meal-order-item.model';

type EntityResponseType = HttpResponse<IMealOrderItem>;
type EntityArrayResponseType = HttpResponse<IMealOrderItem[]>;

@Injectable({ providedIn: 'root' })
export class MealOrderItemService {
    private resourceUrl = SERVER_API_URL + 'api/meal-order-items';

    constructor(private http: HttpClient) {}

    create(mealOrderItem: IMealOrderItem): Observable<EntityResponseType> {
        return this.http.post<IMealOrderItem>(this.resourceUrl, mealOrderItem, { observe: 'response' });
    }

    update(mealOrderItem: IMealOrderItem): Observable<EntityResponseType> {
        return this.http.put<IMealOrderItem>(this.resourceUrl, mealOrderItem, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMealOrderItem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMealOrderItem[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
