import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAgentAdmin } from 'app/shared/model/agent-admin.model';
import { AgentAdminService } from './agent-admin.service';

@Component({
    selector: 'jhi-agent-admin-delete-dialog',
    templateUrl: './agent-admin-delete-dialog.component.html'
})
export class AgentAdminDeleteDialogComponent {
    agentAdmin: IAgentAdmin;

    constructor(private agentAdminService: AgentAdminService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.agentAdminService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'agentAdminListModification',
                content: 'Deleted an agentAdmin'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-agent-admin-delete-popup',
    template: ''
})
export class AgentAdminDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ agentAdmin }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AgentAdminDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.agentAdmin = agentAdmin;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
