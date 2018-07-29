import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IBonusPool } from 'app/shared/model/bonus-pool.model';
import { BonusPoolService } from './bonus-pool.service';
import { IAgentArea } from 'app/shared/model/agent-area.model';
import { AgentAreaService } from 'app/entities/agent-area';

@Component({
    selector: 'jhi-bonus-pool-update',
    templateUrl: './bonus-pool-update.component.html'
})
export class BonusPoolUpdateComponent implements OnInit {
    private _bonusPool: IBonusPool;
    isSaving: boolean;

    agentareas: IAgentArea[];
    dateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private bonusPoolService: BonusPoolService,
        private agentAreaService: AgentAreaService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ bonusPool }) => {
            this.bonusPool = bonusPool;
        });
        this.agentAreaService.query().subscribe(
            (res: HttpResponse<IAgentArea[]>) => {
                this.agentareas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.bonusPool.id !== undefined) {
            this.subscribeToSaveResponse(this.bonusPoolService.update(this.bonusPool));
        } else {
            this.subscribeToSaveResponse(this.bonusPoolService.create(this.bonusPool));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBonusPool>>) {
        result.subscribe((res: HttpResponse<IBonusPool>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAgentAreaById(index: number, item: IAgentArea) {
        return item.id;
    }
    get bonusPool() {
        return this._bonusPool;
    }

    set bonusPool(bonusPool: IBonusPool) {
        this._bonusPool = bonusPool;
    }
}
