import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAgentProvince } from 'app/shared/model/agent-province.model';
import { AgentProvinceService } from './agent-province.service';

@Component({
    selector: 'jhi-agent-province-delete-dialog',
    templateUrl: './agent-province-delete-dialog.component.html'
})
export class AgentProvinceDeleteDialogComponent {
    agentProvince: IAgentProvince;

    constructor(
        private agentProvinceService: AgentProvinceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.agentProvinceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'agentProvinceListModification',
                content: 'Deleted an agentProvince'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-agent-province-delete-popup',
    template: ''
})
export class AgentProvinceDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ agentProvince }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AgentProvinceDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.agentProvince = agentProvince;
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
