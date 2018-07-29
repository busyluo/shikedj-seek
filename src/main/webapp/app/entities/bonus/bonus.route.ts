import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bonus } from 'app/shared/model/bonus.model';
import { BonusService } from './bonus.service';
import { BonusComponent } from './bonus.component';
import { BonusDetailComponent } from './bonus-detail.component';
import { BonusUpdateComponent } from './bonus-update.component';
import { BonusDeletePopupComponent } from './bonus-delete-dialog.component';
import { IBonus } from 'app/shared/model/bonus.model';

@Injectable({ providedIn: 'root' })
export class BonusResolve implements Resolve<IBonus> {
    constructor(private service: BonusService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((bonus: HttpResponse<Bonus>) => bonus.body));
        }
        return of(new Bonus());
    }
}

export const bonusRoute: Routes = [
    {
        path: 'bonus',
        component: BonusComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.bonus.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bonus/:id/view',
        component: BonusDetailComponent,
        resolve: {
            bonus: BonusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.bonus.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bonus/new',
        component: BonusUpdateComponent,
        resolve: {
            bonus: BonusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.bonus.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bonus/:id/edit',
        component: BonusUpdateComponent,
        resolve: {
            bonus: BonusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.bonus.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bonusPopupRoute: Routes = [
    {
        path: 'bonus/:id/delete',
        component: BonusDeletePopupComponent,
        resolve: {
            bonus: BonusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.bonus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
