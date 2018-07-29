import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDistrict } from 'app/shared/model/district.model';
import { Principal } from 'app/core';
import { DistrictService } from './district.service';

@Component({
    selector: 'jhi-district',
    templateUrl: './district.component.html'
})
export class DistrictComponent implements OnInit, OnDestroy {
    districts: IDistrict[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private districtService: DistrictService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.districtService.query().subscribe(
            (res: HttpResponse<IDistrict[]>) => {
                this.districts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDistricts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDistrict) {
        return item.id;
    }

    registerChangeInDistricts() {
        this.eventSubscriber = this.eventManager.subscribe('districtListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
