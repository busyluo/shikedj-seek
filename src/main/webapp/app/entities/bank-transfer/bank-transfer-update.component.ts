import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IBankTransfer } from 'app/shared/model/bank-transfer.model';
import { BankTransferService } from './bank-transfer.service';
import { IBankAccount } from 'app/shared/model/bank-account.model';
import { BankAccountService } from 'app/entities/bank-account';
import { IUserExtra } from 'app/shared/model/user-extra.model';
import { UserExtraService } from 'app/entities/user-extra';

@Component({
    selector: 'jhi-bank-transfer-update',
    templateUrl: './bank-transfer-update.component.html'
})
export class BankTransferUpdateComponent implements OnInit {
    private _bankTransfer: IBankTransfer;
    isSaving: boolean;

    bankaccounts: IBankAccount[];

    userextras: IUserExtra[];
    time: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private bankTransferService: BankTransferService,
        private bankAccountService: BankAccountService,
        private userExtraService: UserExtraService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ bankTransfer }) => {
            this.bankTransfer = bankTransfer;
        });
        this.bankAccountService.query().subscribe(
            (res: HttpResponse<IBankAccount[]>) => {
                this.bankaccounts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.userExtraService.query().subscribe(
            (res: HttpResponse<IUserExtra[]>) => {
                this.userextras = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.bankTransfer.time = moment(this.time, DATE_TIME_FORMAT);
        if (this.bankTransfer.id !== undefined) {
            this.subscribeToSaveResponse(this.bankTransferService.update(this.bankTransfer));
        } else {
            this.subscribeToSaveResponse(this.bankTransferService.create(this.bankTransfer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBankTransfer>>) {
        result.subscribe((res: HttpResponse<IBankTransfer>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackBankAccountById(index: number, item: IBankAccount) {
        return item.id;
    }

    trackUserExtraById(index: number, item: IUserExtra) {
        return item.id;
    }
    get bankTransfer() {
        return this._bankTransfer;
    }

    set bankTransfer(bankTransfer: IBankTransfer) {
        this._bankTransfer = bankTransfer;
        this.time = moment(bankTransfer.time).format(DATE_TIME_FORMAT);
    }
}
