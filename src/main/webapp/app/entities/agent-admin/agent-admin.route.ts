import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AgentAdmin } from 'app/shared/model/agent-admin.model';
import { AgentAdminService } from './agent-admin.service';
import { AgentAdminComponent } from './agent-admin.component';
import { AgentAdminDetailComponent } from './agent-admin-detail.component';
import { AgentAdminUpdateComponent } from './agent-admin-update.component';
import { AgentAdminDeletePopupComponent } from './agent-admin-delete-dialog.component';
import { IAgentAdmin } from 'app/shared/model/agent-admin.model';

@Injectable({ providedIn: 'root' })
export class AgentAdminResolve implements Resolve<IAgentAdmin> {
    constructor(private service: AgentAdminService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((agentAdmin: HttpResponse<AgentAdmin>) => agentAdmin.body));
        }
        return of(new AgentAdmin());
    }
}

export const agentAdminRoute: Routes = [
    {
        path: 'agent-admin',
        component: AgentAdminComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.agentAdmin.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'agent-admin/:id/view',
        component: AgentAdminDetailComponent,
        resolve: {
            agentAdmin: AgentAdminResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.agentAdmin.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'agent-admin/new',
        component: AgentAdminUpdateComponent,
        resolve: {
            agentAdmin: AgentAdminResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.agentAdmin.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'agent-admin/:id/edit',
        component: AgentAdminUpdateComponent,
        resolve: {
            agentAdmin: AgentAdminResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.agentAdmin.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const agentAdminPopupRoute: Routes = [
    {
        path: 'agent-admin/:id/delete',
        component: AgentAdminDeletePopupComponent,
        resolve: {
            agentAdmin: AgentAdminResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.agentAdmin.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
