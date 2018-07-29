import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRestaurantType } from 'app/shared/model/restaurant-type.model';

type EntityResponseType = HttpResponse<IRestaurantType>;
type EntityArrayResponseType = HttpResponse<IRestaurantType[]>;

@Injectable({ providedIn: 'root' })
export class RestaurantTypeService {
    private resourceUrl = SERVER_API_URL + 'api/restaurant-types';

    constructor(private http: HttpClient) {}

    create(restaurantType: IRestaurantType): Observable<EntityResponseType> {
        return this.http.post<IRestaurantType>(this.resourceUrl, restaurantType, { observe: 'response' });
    }

    update(restaurantType: IRestaurantType): Observable<EntityResponseType> {
        return this.http.put<IRestaurantType>(this.resourceUrl, restaurantType, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IRestaurantType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRestaurantType[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
