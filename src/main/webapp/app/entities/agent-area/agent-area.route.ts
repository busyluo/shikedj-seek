import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AgentArea } from 'app/shared/model/agent-area.model';
import { AgentAreaService } from './agent-area.service';
import { AgentAreaComponent } from './agent-area.component';
import { AgentAreaDetailComponent } from './agent-area-detail.component';
import { AgentAreaUpdateComponent } from './agent-area-update.component';
import { AgentAreaDeletePopupComponent } from './agent-area-delete-dialog.component';
import { IAgentArea } from 'app/shared/model/agent-area.model';

@Injectable({ providedIn: 'root' })
export class AgentAreaResolve implements Resolve<IAgentArea> {
    constructor(private service: AgentAreaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((agentArea: HttpResponse<AgentArea>) => agentArea.body));
        }
        return of(new AgentArea());
    }
}

export const agentAreaRoute: Routes = [
    {
        path: 'agent-area',
        component: AgentAreaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.agentArea.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'agent-area/:id/view',
        component: AgentAreaDetailComponent,
        resolve: {
            agentArea: AgentAreaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.agentArea.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'agent-area/new',
        component: AgentAreaUpdateComponent,
        resolve: {
            agentArea: AgentAreaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.agentArea.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'agent-area/:id/edit',
        component: AgentAreaUpdateComponent,
        resolve: {
            agentArea: AgentAreaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.agentArea.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const agentAreaPopupRoute: Routes = [
    {
        path: 'agent-area/:id/delete',
        component: AgentAreaDeletePopupComponent,
        resolve: {
            agentArea: AgentAreaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.agentArea.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
