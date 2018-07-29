import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAdmin } from 'app/shared/model/admin.model';
import { AdminService } from './admin.service';
import { IUserExtra } from 'app/shared/model/user-extra.model';
import { UserExtraService } from 'app/entities/user-extra';

@Component({
    selector: 'jhi-admin-update',
    templateUrl: './admin-update.component.html'
})
export class AdminUpdateComponent implements OnInit {
    private _admin: IAdmin;
    isSaving: boolean;

    users: IUserExtra[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private adminService: AdminService,
        private userExtraService: UserExtraService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ admin }) => {
            this.admin = admin;
        });
        this.userExtraService.query({ filter: 'admin-is-null' }).subscribe(
            (res: HttpResponse<IUserExtra[]>) => {
                if (!this.admin.user || !this.admin.user.id) {
                    this.users = res.body;
                } else {
                    this.userExtraService.find(this.admin.user.id).subscribe(
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
        if (this.admin.id !== undefined) {
            this.subscribeToSaveResponse(this.adminService.update(this.admin));
        } else {
            this.subscribeToSaveResponse(this.adminService.create(this.admin));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAdmin>>) {
        result.subscribe((res: HttpResponse<IAdmin>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get admin() {
        return this._admin;
    }

    set admin(admin: IAdmin) {
        this._admin = admin;
    }
}
