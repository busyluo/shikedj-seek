import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAgentAdmin } from 'app/shared/model/agent-admin.model';

type EntityResponseType = HttpResponse<IAgentAdmin>;
type EntityArrayResponseType = HttpResponse<IAgentAdmin[]>;

@Injectable({ providedIn: 'root' })
export class AgentAdminService {
    private resourceUrl = SERVER_API_URL + 'api/agent-admins';

    constructor(private http: HttpClient) {}

    create(agentAdmin: IAgentAdmin): Observable<EntityResponseType> {
        return this.http.post<IAgentAdmin>(this.resourceUrl, agentAdmin, { observe: 'response' });
    }

    update(agentAdmin: IAgentAdmin): Observable<EntityResponseType> {
        return this.http.put<IAgentAdmin>(this.resourceUrl, agentAdmin, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAgentAdmin>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAgentAdmin[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
