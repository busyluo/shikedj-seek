import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAgentArea } from 'app/shared/model/agent-area.model';
import { AgentAreaService } from './agent-area.service';

@Component({
    selector: 'jhi-agent-area-delete-dialog',
    templateUrl: './agent-area-delete-dialog.component.html'
})
export class AgentAreaDeleteDialogComponent {
    agentArea: IAgentArea;

    constructor(private agentAreaService: AgentAreaService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.agentAreaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'agentAreaListModification',
                content: 'Deleted an agentArea'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-agent-area-delete-popup',
    template: ''
})
export class AgentAreaDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ agentArea }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AgentAreaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.agentArea = agentArea;
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
