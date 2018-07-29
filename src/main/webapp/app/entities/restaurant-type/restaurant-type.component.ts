import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRestaurantType } from 'app/shared/model/restaurant-type.model';
import { Principal } from 'app/core';
import { RestaurantTypeService } from './restaurant-type.service';

@Component({
    selector: 'jhi-restaurant-type',
    templateUrl: './restaurant-type.component.html'
})
export class RestaurantTypeComponent implements OnInit, OnDestroy {
    restaurantTypes: IRestaurantType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private restaurantTypeService: RestaurantTypeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.restaurantTypeService.query().subscribe(
            (res: HttpResponse<IRestaurantType[]>) => {
                this.restaurantTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRestaurantTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRestaurantType) {
        return item.id;
    }

    registerChangeInRestaurantTypes() {
        this.eventSubscriber = this.eventManager.subscribe('restaurantTypeListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
