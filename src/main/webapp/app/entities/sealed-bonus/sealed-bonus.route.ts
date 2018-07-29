import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SealedBonus } from 'app/shared/model/sealed-bonus.model';
import { SealedBonusService } from './sealed-bonus.service';
import { SealedBonusComponent } from './sealed-bonus.component';
import { SealedBonusDetailComponent } from './sealed-bonus-detail.component';
import { SealedBonusUpdateComponent } from './sealed-bonus-update.component';
import { SealedBonusDeletePopupComponent } from './sealed-bonus-delete-dialog.component';
import { ISealedBonus } from 'app/shared/model/sealed-bonus.model';

@Injectable({ providedIn: 'root' })
export class SealedBonusResolve implements Resolve<ISealedBonus> {
    constructor(private service: SealedBonusService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((sealedBonus: HttpResponse<SealedBonus>) => sealedBonus.body));
        }
        return of(new SealedBonus());
    }
}

export const sealedBonusRoute: Routes = [
    {
        path: 'sealed-bonus',
        component: SealedBonusComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.sealedBonus.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sealed-bonus/:id/view',
        component: SealedBonusDetailComponent,
        resolve: {
            sealedBonus: SealedBonusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.sealedBonus.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sealed-bonus/new',
        component: SealedBonusUpdateComponent,
        resolve: {
            sealedBonus: SealedBonusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.sealedBonus.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sealed-bonus/:id/edit',
        component: SealedBonusUpdateComponent,
        resolve: {
            sealedBonus: SealedBonusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.sealedBonus.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sealedBonusPopupRoute: Routes = [
    {
        path: 'sealed-bonus/:id/delete',
        component: SealedBonusDeletePopupComponent,
        resolve: {
            sealedBonus: SealedBonusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.sealedBonus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
