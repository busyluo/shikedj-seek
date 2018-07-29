import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBankTransfer } from 'app/shared/model/bank-transfer.model';
import { BankTransferService } from './bank-transfer.service';

@Component({
    selector: 'jhi-bank-transfer-delete-dialog',
    templateUrl: './bank-transfer-delete-dialog.component.html'
})
export class BankTransferDeleteDialogComponent {
    bankTransfer: IBankTransfer;

    constructor(
        private bankTransferService: BankTransferService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bankTransferService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'bankTransferListModification',
                content: 'Deleted an bankTransfer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bank-transfer-delete-popup',
    template: ''
})
export class BankTransferDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ bankTransfer }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BankTransferDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.bankTransfer = bankTransfer;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
