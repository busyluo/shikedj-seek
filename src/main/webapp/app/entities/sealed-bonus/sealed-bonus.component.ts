import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISealedBonus } from 'app/shared/model/sealed-bonus.model';
import { Principal } from 'app/core';
import { SealedBonusService } from './sealed-bonus.service';

@Component({
    selector: 'jhi-sealed-bonus',
    templateUrl: './sealed-bonus.component.html'
})
export class SealedBonusComponent implements OnInit, OnDestroy {
    sealedBonuses: ISealedBonus[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private sealedBonusService: SealedBonusService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.sealedBonusService.query().subscribe(
            (res: HttpResponse<ISealedBonus[]>) => {
                this.sealedBonuses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSealedBonuses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISealedBonus) {
        return item.id;
    }

    registerChangeInSealedBonuses() {
        this.eventSubscriber = this.eventManager.subscribe('sealedBonusListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
