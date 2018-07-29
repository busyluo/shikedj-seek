import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMealOrderItem } from 'app/shared/model/meal-order-item.model';
import { Principal } from 'app/core';
import { MealOrderItemService } from './meal-order-item.service';

@Component({
    selector: 'jhi-meal-order-item',
    templateUrl: './meal-order-item.component.html'
})
export class MealOrderItemComponent implements OnInit, OnDestroy {
    mealOrderItems: IMealOrderItem[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private mealOrderItemService: MealOrderItemService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.mealOrderItemService.query().subscribe(
            (res: HttpResponse<IMealOrderItem[]>) => {
                this.mealOrderItems = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMealOrderItems();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMealOrderItem) {
        return item.id;
    }

    registerChangeInMealOrderItems() {
        this.eventSubscriber = this.eventManager.subscribe('mealOrderItemListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
