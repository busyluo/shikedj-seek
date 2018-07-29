import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBonusPool } from 'app/shared/model/bonus-pool.model';
import { BonusPoolService } from './bonus-pool.service';

@Component({
    selector: 'jhi-bonus-pool-delete-dialog',
    templateUrl: './bonus-pool-delete-dialog.component.html'
})
export class BonusPoolDeleteDialogComponent {
    bonusPool: IBonusPool;

    constructor(private bonusPoolService: BonusPoolService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bonusPoolService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'bonusPoolListModification',
                content: 'Deleted an bonusPool'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bonus-pool-delete-popup',
    template: ''
})
export class BonusPoolDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ bonusPool }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BonusPoolDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.bonusPool = bonusPool;
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
