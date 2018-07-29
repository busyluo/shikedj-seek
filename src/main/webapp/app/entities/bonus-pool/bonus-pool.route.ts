import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BonusPool } from 'app/shared/model/bonus-pool.model';
import { BonusPoolService } from './bonus-pool.service';
import { BonusPoolComponent } from './bonus-pool.component';
import { BonusPoolDetailComponent } from './bonus-pool-detail.component';
import { BonusPoolUpdateComponent } from './bonus-pool-update.component';
import { BonusPoolDeletePopupComponent } from './bonus-pool-delete-dialog.component';
import { IBonusPool } from 'app/shared/model/bonus-pool.model';

@Injectable({ providedIn: 'root' })
export class BonusPoolResolve implements Resolve<IBonusPool> {
    constructor(private service: BonusPoolService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((bonusPool: HttpResponse<BonusPool>) => bonusPool.body));
        }
        return of(new BonusPool());
    }
}

export const bonusPoolRoute: Routes = [
    {
        path: 'bonus-pool',
        component: BonusPoolComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.bonusPool.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bonus-pool/:id/view',
        component: BonusPoolDetailComponent,
        resolve: {
            bonusPool: BonusPoolResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.bonusPool.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bonus-pool/new',
        component: BonusPoolUpdateComponent,
        resolve: {
            bonusPool: BonusPoolResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.bonusPool.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bonus-pool/:id/edit',
        component: BonusPoolUpdateComponent,
        resolve: {
            bonusPool: BonusPoolResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.bonusPool.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bonusPoolPopupRoute: Routes = [
    {
        path: 'bonus-pool/:id/delete',
        component: BonusPoolDeletePopupComponent,
        resolve: {
            bonusPool: BonusPoolResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.bonusPool.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
