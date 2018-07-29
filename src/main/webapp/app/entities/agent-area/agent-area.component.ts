import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAgentArea } from 'app/shared/model/agent-area.model';
import { Principal } from 'app/core';
import { AgentAreaService } from './agent-area.service';

@Component({
    selector: 'jhi-agent-area',
    templateUrl: './agent-area.component.html'
})
export class AgentAreaComponent implements OnInit, OnDestroy {
    agentAreas: IAgentArea[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private agentAreaService: AgentAreaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.agentAreaService.query().subscribe(
            (res: HttpResponse<IAgentArea[]>) => {
                this.agentAreas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAgentAreas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAgentArea) {
        return item.id;
    }

    registerChangeInAgentAreas() {
        this.eventSubscriber = this.eventManager.subscribe('agentAreaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
