import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRestaurantType } from 'app/shared/model/restaurant-type.model';
import { RestaurantTypeService } from './restaurant-type.service';

@Component({
    selector: 'jhi-restaurant-type-delete-dialog',
    templateUrl: './restaurant-type-delete-dialog.component.html'
})
export class RestaurantTypeDeleteDialogComponent {
    restaurantType: IRestaurantType;

    constructor(
        private restaurantTypeService: RestaurantTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.restaurantTypeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'restaurantTypeListModification',
                content: 'Deleted an restaurantType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-restaurant-type-delete-popup',
    template: ''
})
export class RestaurantTypeDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ restaurantType }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RestaurantTypeDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.restaurantType = restaurantType;
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
