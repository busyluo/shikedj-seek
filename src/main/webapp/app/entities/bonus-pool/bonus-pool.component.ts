import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBonusPool } from 'app/shared/model/bonus-pool.model';
import { Principal } from 'app/core';
import { BonusPoolService } from './bonus-pool.service';

@Component({
    selector: 'jhi-bonus-pool',
    templateUrl: './bonus-pool.component.html'
})
export class BonusPoolComponent implements OnInit, OnDestroy {
    bonusPools: IBonusPool[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private bonusPoolService: BonusPoolService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.bonusPoolService.query().subscribe(
            (res: HttpResponse<IBonusPool[]>) => {
                this.bonusPools = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBonusPools();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBonusPool) {
        return item.id;
    }

    registerChangeInBonusPools() {
        this.eventSubscriber = this.eventManager.subscribe('bonusPoolListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
