import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAgentArea } from 'app/shared/model/agent-area.model';

@Component({
    selector: 'jhi-agent-area-detail',
    templateUrl: './agent-area-detail.component.html'
})
export class AgentAreaDetailComponent implements OnInit {
    agentArea: IAgentArea;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ agentArea }) => {
            this.agentArea = agentArea;
        });
    }

    previousState() {
        window.history.back();
    }
}
