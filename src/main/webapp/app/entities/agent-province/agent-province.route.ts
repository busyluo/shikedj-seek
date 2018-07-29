import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AgentProvince } from 'app/shared/model/agent-province.model';
import { AgentProvinceService } from './agent-province.service';
import { AgentProvinceComponent } from './agent-province.component';
import { AgentProvinceDetailComponent } from './agent-province-detail.component';
import { AgentProvinceUpdateComponent } from './agent-province-update.component';
import { AgentProvinceDeletePopupComponent } from './agent-province-delete-dialog.component';
import { IAgentProvince } from 'app/shared/model/agent-province.model';

@Injectable({ providedIn: 'root' })
export class AgentProvinceResolve implements Resolve<IAgentProvince> {
    constructor(private service: AgentProvinceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((agentProvince: HttpResponse<AgentProvince>) => agentProvince.body));
        }
        return of(new AgentProvince());
    }
}

export const agentProvinceRoute: Routes = [
    {
        path: 'agent-province',
        component: AgentProvinceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.agentProvince.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'agent-province/:id/view',
        component: AgentProvinceDetailComponent,
        resolve: {
            agentProvince: AgentProvinceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.agentProvince.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'agent-province/new',
        component: AgentProvinceUpdateComponent,
        resolve: {
            agentProvince: AgentProvinceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.agentProvince.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'agent-province/:id/edit',
        component: AgentProvinceUpdateComponent,
        resolve: {
            agentProvince: AgentProvinceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.agentProvince.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const agentProvincePopupRoute: Routes = [
    {
        path: 'agent-province/:id/delete',
        component: AgentProvinceDeletePopupComponent,
        resolve: {
            agentProvince: AgentProvinceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.agentProvince.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
