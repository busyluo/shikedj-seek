import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAgentProvince } from 'app/shared/model/agent-province.model';

@Component({
    selector: 'jhi-agent-province-detail',
    templateUrl: './agent-province-detail.component.html'
})
export class AgentProvinceDetailComponent implements OnInit {
    agentProvince: IAgentProvince;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ agentProvince }) => {
            this.agentProvince = agentProvince;
        });
    }

    previousState() {
        window.history.back();
    }
}
