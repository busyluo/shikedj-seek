import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRestauranteur } from 'app/shared/model/restauranteur.model';
import { RestauranteurService } from './restauranteur.service';

@Component({
    selector: 'jhi-restauranteur-delete-dialog',
    templateUrl: './restauranteur-delete-dialog.component.html'
})
export class RestauranteurDeleteDialogComponent {
    restauranteur: IRestauranteur;

    constructor(
        private restauranteurService: RestauranteurService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.restauranteurService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'restauranteurListModification',
                content: 'Deleted an restauranteur'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-restauranteur-delete-popup',
    template: ''
})
export class RestauranteurDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ restauranteur }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RestauranteurDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.restauranteur = restauranteur;
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
