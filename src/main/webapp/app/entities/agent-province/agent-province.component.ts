import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAgentProvince } from 'app/shared/model/agent-province.model';
import { Principal } from 'app/core';
import { AgentProvinceService } from './agent-province.service';

@Component({
    selector: 'jhi-agent-province',
    templateUrl: './agent-province.component.html'
})
export class AgentProvinceComponent implements OnInit, OnDestroy {
    agentProvinces: IAgentProvince[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private agentProvinceService: AgentProvinceService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.agentProvinceService.query().subscribe(
            (res: HttpResponse<IAgentProvince[]>) => {
                this.agentProvinces = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAgentProvinces();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAgentProvince) {
        return item.id;
    }

    registerChangeInAgentProvinces() {
        this.eventSubscriber = this.eventManager.subscribe('agentProvinceListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
