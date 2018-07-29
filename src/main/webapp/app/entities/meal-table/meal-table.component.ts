import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMealTable } from 'app/shared/model/meal-table.model';
import { Principal } from 'app/core';
import { MealTableService } from './meal-table.service';

@Component({
    selector: 'jhi-meal-table',
    templateUrl: './meal-table.component.html'
})
export class MealTableComponent implements OnInit, OnDestroy {
    mealTables: IMealTable[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private mealTableService: MealTableService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.mealTableService.query().subscribe(
            (res: HttpResponse<IMealTable[]>) => {
                this.mealTables = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMealTables();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMealTable) {
        return item.id;
    }

    registerChangeInMealTables() {
        this.eventSubscriber = this.eventManager.subscribe('mealTableListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
