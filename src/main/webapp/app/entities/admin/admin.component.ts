import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAdmin } from 'app/shared/model/admin.model';
import { Principal } from 'app/core';
import { AdminService } from './admin.service';

@Component({
    selector: 'jhi-admin',
    templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit, OnDestroy {
    admins: IAdmin[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private adminService: AdminService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.adminService.query().subscribe(
            (res: HttpResponse<IAdmin[]>) => {
                this.admins = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAdmins();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAdmin) {
        return item.id;
    }

    registerChangeInAdmins() {
        this.eventSubscriber = this.eventManager.subscribe('adminListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
