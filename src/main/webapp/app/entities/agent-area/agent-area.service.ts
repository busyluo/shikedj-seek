import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAgentArea } from 'app/shared/model/agent-area.model';

type EntityResponseType = HttpResponse<IAgentArea>;
type EntityArrayResponseType = HttpResponse<IAgentArea[]>;

@Injectable({ providedIn: 'root' })
export class AgentAreaService {
    private resourceUrl = SERVER_API_URL + 'api/agent-areas';

    constructor(private http: HttpClient) {}

    create(agentArea: IAgentArea): Observable<EntityResponseType> {
        return this.http.post<IAgentArea>(this.resourceUrl, agentArea, { observe: 'response' });
    }

    update(agentArea: IAgentArea): Observable<EntityResponseType> {
        return this.http.put<IAgentArea>(this.resourceUrl, agentArea, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAgentArea>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAgentArea[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
