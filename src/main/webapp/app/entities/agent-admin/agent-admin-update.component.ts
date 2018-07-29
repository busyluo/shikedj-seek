import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAgentAdmin } from 'app/shared/model/agent-admin.model';
import { AgentAdminService } from './agent-admin.service';
import { IUserExtra } from 'app/shared/model/user-extra.model';
import { UserExtraService } from 'app/entities/user-extra';

@Component({
    selector: 'jhi-agent-admin-update',
    templateUrl: './agent-admin-update.component.html'
})
export class AgentAdminUpdateComponent implements OnInit {
    private _agentAdmin: IAgentAdmin;
    isSaving: boolean;

    users: IUserExtra[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private agentAdminService: AgentAdminService,
        private userExtraService: UserExtraService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ agentAdmin }) => {
            this.agentAdmin = agentAdmin;
        });
        this.userExtraService.query({ filter: 'agentadmin-is-null' }).subscribe(
            (res: HttpResponse<IUserExtra[]>) => {
                if (!this.agentAdmin.user || !this.agentAdmin.user.id) {
                    this.users = res.body;
                } else {
                    this.userExtraService.find(this.agentAdmin.user.id).subscribe(
                        (subRes: HttpResponse<IUserExtra>) => {
                            this.users = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.agentAdmin.id !== undefined) {
            this.subscribeToSaveResponse(this.agentAdminService.update(this.agentAdmin));
        } else {
            this.subscribeToSaveResponse(this.agentAdminService.create(this.agentAdmin));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAgentAdmin>>) {
        result.subscribe((res: HttpResponse<IAgentAdmin>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserExtraById(index: number, item: IUserExtra) {
        return item.id;
    }
    get agentAdmin() {
        return this._agentAdmin;
    }

    set agentAdmin(agentAdmin: IAgentAdmin) {
        this._agentAdmin = agentAdmin;
    }
}
