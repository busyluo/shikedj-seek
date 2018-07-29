import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAgentAdmin } from 'app/shared/model/agent-admin.model';

@Component({
    selector: 'jhi-agent-admin-detail',
    templateUrl: './agent-admin-detail.component.html'
})
export class AgentAdminDetailComponent implements OnInit {
    agentAdmin: IAgentAdmin;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ agentAdmin }) => {
            this.agentAdmin = agentAdmin;
        });
    }

    previousState() {
        window.history.back();
    }
}
