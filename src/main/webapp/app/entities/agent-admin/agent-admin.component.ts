import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAgentAdmin } from 'app/shared/model/agent-admin.model';
import { Principal } from 'app/core';
import { AgentAdminService } from './agent-admin.service';

@Component({
    selector: 'jhi-agent-admin',
    templateUrl: './agent-admin.component.html'
})
export class AgentAdminComponent implements OnInit, OnDestroy {
    agentAdmins: IAgentAdmin[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private agentAdminService: AgentAdminService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.agentAdminService.query().subscribe(
            (res: HttpResponse<IAgentAdmin[]>) => {
                this.agentAdmins = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAgentAdmins();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAgentAdmin) {
        return item.id;
    }

    registerChangeInAgentAdmins() {
        this.eventSubscriber = this.eventManager.subscribe('agentAdminListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
