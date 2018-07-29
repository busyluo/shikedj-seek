import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Admin } from 'app/shared/model/admin.model';
import { AdminService } from './admin.service';
import { AdminComponent } from './admin.component';
import { AdminDetailComponent } from './admin-detail.component';
import { AdminUpdateComponent } from './admin-update.component';
import { AdminDeletePopupComponent } from './admin-delete-dialog.component';
import { IAdmin } from 'app/shared/model/admin.model';

@Injectable({ providedIn: 'root' })
export class AdminResolve implements Resolve<IAdmin> {
    constructor(private service: AdminService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((admin: HttpResponse<Admin>) => admin.body));
        }
        return of(new Admin());
    }
}

export const adminRoute: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.admin.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'admin/:id/view',
        component: AdminDetailComponent,
        resolve: {
            admin: AdminResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.admin.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'admin/new',
        component: AdminUpdateComponent,
        resolve: {
            admin: AdminResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.admin.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'admin/:id/edit',
        component: AdminUpdateComponent,
        resolve: {
            admin: AdminResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.admin.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const adminPopupRoute: Routes = [
    {
        path: 'admin/:id/delete',
        component: AdminDeletePopupComponent,
        resolve: {
            admin: AdminResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.admin.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
