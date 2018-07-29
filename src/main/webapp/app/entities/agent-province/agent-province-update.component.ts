import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAgentProvince } from 'app/shared/model/agent-province.model';
import { AgentProvinceService } from './agent-province.service';
import { IProvince } from 'app/shared/model/province.model';
import { ProvinceService } from 'app/entities/province';
import { IAgentAdmin } from 'app/shared/model/agent-admin.model';
import { AgentAdminService } from 'app/entities/agent-admin';

@Component({
    selector: 'jhi-agent-province-update',
    templateUrl: './agent-province-update.component.html'
})
export class AgentProvinceUpdateComponent implements OnInit {
    private _agentProvince: IAgentProvince;
    isSaving: boolean;

    provinces: IProvince[];

    agentadmins: IAgentAdmin[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private agentProvinceService: AgentProvinceService,
        private provinceService: ProvinceService,
        private agentAdminService: AgentAdminService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ agentProvince }) => {
            this.agentProvince = agentProvince;
        });
        this.provinceService.query({ filter: 'agentprovince-is-null' }).subscribe(
            (res: HttpResponse<IProvince[]>) => {
                if (!this.agentProvince.province || !this.agentProvince.province.id) {
                    this.provinces = res.body;
                } else {
                    this.provinceService.find(this.agentProvince.province.id).subscribe(
                        (subRes: HttpResponse<IProvince>) => {
                            this.provinces = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.agentAdminService.query().subscribe(
            (res: HttpResponse<IAgentAdmin[]>) => {
                this.agentadmins = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.agentProvince.id !== undefined) {
            this.subscribeToSaveResponse(this.agentProvinceService.update(this.agentProvince));
        } else {
            this.subscribeToSaveResponse(this.agentProvinceService.create(this.agentProvince));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAgentProvince>>) {
        result.subscribe((res: HttpResponse<IAgentProvince>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProvinceById(index: number, item: IProvince) {
        return item.id;
    }

    trackAgentAdminById(index: number, item: IAgentAdmin) {
        return item.id;
    }
    get agentProvince() {
        return this._agentProvince;
    }

    set agentProvince(agentProvince: IAgentProvince) {
        this._agentProvince = agentProvince;
    }
}
