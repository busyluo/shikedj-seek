import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMealOrderItem } from 'app/shared/model/meal-order-item.model';
import { MealOrderItemService } from './meal-order-item.service';

@Component({
    selector: 'jhi-meal-order-item-delete-dialog',
    templateUrl: './meal-order-item-delete-dialog.component.html'
})
export class MealOrderItemDeleteDialogComponent {
    mealOrderItem: IMealOrderItem;

    constructor(
        private mealOrderItemService: MealOrderItemService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mealOrderItemService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'mealOrderItemListModification',
                content: 'Deleted an mealOrderItem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-meal-order-item-delete-popup',
    template: ''
})
export class MealOrderItemDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mealOrderItem }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MealOrderItemDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.mealOrderItem = mealOrderItem;
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
