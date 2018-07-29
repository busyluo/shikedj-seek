import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMealTable } from 'app/shared/model/meal-table.model';

type EntityResponseType = HttpResponse<IMealTable>;
type EntityArrayResponseType = HttpResponse<IMealTable[]>;

@Injectable({ providedIn: 'root' })
export class MealTableService {
    private resourceUrl = SERVER_API_URL + 'api/meal-tables';

    constructor(private http: HttpClient) {}

    create(mealTable: IMealTable): Observable<EntityResponseType> {
        return this.http.post<IMealTable>(this.resourceUrl, mealTable, { observe: 'response' });
    }

    update(mealTable: IMealTable): Observable<EntityResponseType> {
        return this.http.put<IMealTable>(this.resourceUrl, mealTable, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMealTable>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMealTable[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
