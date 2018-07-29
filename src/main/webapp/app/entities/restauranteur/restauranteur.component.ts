import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRestauranteur } from 'app/shared/model/restauranteur.model';
import { Principal } from 'app/core';
import { RestauranteurService } from './restauranteur.service';

@Component({
    selector: 'jhi-restauranteur',
    templateUrl: './restauranteur.component.html'
})
export class RestauranteurComponent implements OnInit, OnDestroy {
    restauranteurs: IRestauranteur[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private restauranteurService: RestauranteurService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.restauranteurService.query().subscribe(
            (res: HttpResponse<IRestauranteur[]>) => {
                this.restauranteurs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRestauranteurs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRestauranteur) {
        return item.id;
    }

    registerChangeInRestauranteurs() {
        this.eventSubscriber = this.eventManager.subscribe('restauranteurListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
