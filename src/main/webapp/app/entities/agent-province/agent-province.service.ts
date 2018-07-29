import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAgentProvince } from 'app/shared/model/agent-province.model';

type EntityResponseType = HttpResponse<IAgentProvince>;
type EntityArrayResponseType = HttpResponse<IAgentProvince[]>;

@Injectable({ providedIn: 'root' })
export class AgentProvinceService {
    private resourceUrl = SERVER_API_URL + 'api/agent-provinces';

    constructor(private http: HttpClient) {}

    create(agentProvince: IAgentProvince): Observable<EntityResponseType> {
        return this.http.post<IAgentProvince>(this.resourceUrl, agentProvince, { observe: 'response' });
    }

    update(agentProvince: IAgentProvince): Observable<EntityResponseType> {
        return this.http.put<IAgentProvince>(this.resourceUrl, agentProvince, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAgentProvince>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAgentProvince[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
