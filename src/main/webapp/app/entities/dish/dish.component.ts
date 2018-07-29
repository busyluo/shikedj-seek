import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDish } from 'app/shared/model/dish.model';
import { Principal } from 'app/core';
import { DishService } from './dish.service';

@Component({
    selector: 'jhi-dish',
    templateUrl: './dish.component.html'
})
export class DishComponent implements OnInit, OnDestroy {
    dishes: IDish[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private dishService: DishService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.dishService.query().subscribe(
            (res: HttpResponse<IDish[]>) => {
                this.dishes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDishes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDish) {
        return item.id;
    }

    registerChangeInDishes() {
        this.eventSubscriber = this.eventManager.subscribe('dishListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
