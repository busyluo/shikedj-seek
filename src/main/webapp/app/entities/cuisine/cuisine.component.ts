import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICuisine } from 'app/shared/model/cuisine.model';
import { Principal } from 'app/core';
import { CuisineService } from './cuisine.service';

@Component({
    selector: 'jhi-cuisine',
    templateUrl: './cuisine.component.html'
})
export class CuisineComponent implements OnInit, OnDestroy {
    cuisines: ICuisine[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cuisineService: CuisineService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.cuisineService.query().subscribe(
            (res: HttpResponse<ICuisine[]>) => {
                this.cuisines = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCuisines();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICuisine) {
        return item.id;
    }

    registerChangeInCuisines() {
        this.eventSubscriber = this.eventManager.subscribe('cuisineListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
