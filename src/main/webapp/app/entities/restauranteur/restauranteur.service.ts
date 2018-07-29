import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRestauranteur } from 'app/shared/model/restauranteur.model';

type EntityResponseType = HttpResponse<IRestauranteur>;
type EntityArrayResponseType = HttpResponse<IRestauranteur[]>;

@Injectable({ providedIn: 'root' })
export class RestauranteurService {
    private resourceUrl = SERVER_API_URL + 'api/restauranteurs';

    constructor(private http: HttpClient) {}

    create(restauranteur: IRestauranteur): Observable<EntityResponseType> {
        return this.http.post<IRestauranteur>(this.resourceUrl, restauranteur, { observe: 'response' });
    }

    update(restauranteur: IRestauranteur): Observable<EntityResponseType> {
        return this.http.put<IRestauranteur>(this.resourceUrl, restauranteur, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IRestauranteur>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRestauranteur[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
