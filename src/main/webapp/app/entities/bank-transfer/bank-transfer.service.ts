import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBankTransfer } from 'app/shared/model/bank-transfer.model';

type EntityResponseType = HttpResponse<IBankTransfer>;
type EntityArrayResponseType = HttpResponse<IBankTransfer[]>;

@Injectable({ providedIn: 'root' })
export class BankTransferService {
    private resourceUrl = SERVER_API_URL + 'api/bank-transfers';

    constructor(private http: HttpClient) {}

    create(bankTransfer: IBankTransfer): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(bankTransfer);
        return this.http
            .post<IBankTransfer>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(bankTransfer: IBankTransfer): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(bankTransfer);
        return this.http
            .put<IBankTransfer>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IBankTransfer>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBankTransfer[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(bankTransfer: IBankTransfer): IBankTransfer {
        const copy: IBankTransfer = Object.assign({}, bankTransfer, {
            time: bankTransfer.time != null && bankTransfer.time.isValid() ? bankTransfer.time.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.time = res.body.time != null ? moment(res.body.time) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((bankTransfer: IBankTransfer) => {
            bankTransfer.time = bankTransfer.time != null ? moment(bankTransfer.time) : null;
        });
        return res;
    }
}
