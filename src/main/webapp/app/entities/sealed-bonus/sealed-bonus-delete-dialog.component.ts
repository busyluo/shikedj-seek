import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISealedBonus } from 'app/shared/model/sealed-bonus.model';
import { SealedBonusService } from './sealed-bonus.service';

@Component({
    selector: 'jhi-sealed-bonus-delete-dialog',
    templateUrl: './sealed-bonus-delete-dialog.component.html'
})
export class SealedBonusDeleteDialogComponent {
    sealedBonus: ISealedBonus;

    constructor(
        private sealedBonusService: SealedBonusService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sealedBonusService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'sealedBonusListModification',
                content: 'Deleted an sealedBonus'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sealed-bonus-delete-popup',
    template: ''
})
export class SealedBonusDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sealedBonus }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SealedBonusDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.sealedBonus = sealedBonus;
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
