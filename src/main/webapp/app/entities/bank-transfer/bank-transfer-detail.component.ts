import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBankTransfer } from 'app/shared/model/bank-transfer.model';

@Component({
    selector: 'jhi-bank-transfer-detail',
    templateUrl: './bank-transfer-detail.component.html'
})
export class BankTransferDetailComponent implements OnInit {
    bankTransfer: IBankTransfer;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ bankTransfer }) => {
            this.bankTransfer = bankTransfer;
        });
    }

    previousState() {
        window.history.back();
    }
}
