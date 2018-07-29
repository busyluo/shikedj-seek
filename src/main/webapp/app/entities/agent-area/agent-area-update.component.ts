import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAgentArea } from 'app/shared/model/agent-area.model';
import { AgentAreaService } from './agent-area.service';
import { IBonusPool } from 'app/shared/model/bonus-pool.model';
import { BonusPoolService } from 'app/entities/bonus-pool';
import { IAgentProvince } from 'app/shared/model/agent-province.model';
import { AgentProvinceService } from 'app/entities/agent-province';
import { IAgent } from 'app/shared/model/agent.model';
import { AgentService } from 'app/entities/agent';

@Component({
    selector: 'jhi-agent-area-update',
    templateUrl: './agent-area-update.component.html'
})
export class AgentAreaUpdateComponent implements OnInit {
    private _agentArea: IAgentArea;
    isSaving: boolean;

    bonuspools: IBonusPool[];

    agentprovinces: IAgentProvince[];

    agents: IAgent[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private agentAreaService: AgentAreaService,
        private bonusPoolService: BonusPoolService,
        private agentProvinceService: AgentProvinceService,
        private agentService: AgentService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ agentArea }) => {
            this.agentArea = agentArea;
        });
        this.bonusPoolService.query({ filter: 'area-is-null' }).subscribe(
            (res: HttpResponse<IBonusPool[]>) => {
                if (!this.agentArea.bonusPool || !this.agentArea.bonusPool.id) {
                    this.bonuspools = res.body;
                } else {
                    this.bonusPoolService.find(this.agentArea.bonusPool.id).subscribe(
                        (subRes: HttpResponse<IBonusPool>) => {
                            this.bonuspools = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.agentProvinceService.query().subscribe(
            (res: HttpResponse<IAgentProvince[]>) => {
                this.agentprovinces = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.agentService.query().subscribe(
            (res: HttpResponse<IAgent[]>) => {
                this.agents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.agentArea.id !== undefined) {
            this.subscribeToSaveResponse(this.agentAreaService.update(this.agentArea));
        } else {
            this.subscribeToSaveResponse(this.agentAreaService.create(this.agentArea));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAgentArea>>) {
        result.subscribe((res: HttpResponse<IAgentArea>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackBonusPoolById(index: number, item: IBonusPool) {
        return item.id;
    }

    trackAgentProvinceById(index: number, item: IAgentProvince) {
        return item.id;
    }

    trackAgentById(index: number, item: IAgent) {
        return item.id;
    }
    get agentArea() {
        return this._agentArea;
    }

    set agentArea(agentArea: IAgentArea) {
        this._agentArea = agentArea;
    }
}
