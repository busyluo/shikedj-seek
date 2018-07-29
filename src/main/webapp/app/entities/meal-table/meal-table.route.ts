import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MealTable } from 'app/shared/model/meal-table.model';
import { MealTableService } from './meal-table.service';
import { MealTableComponent } from './meal-table.component';
import { MealTableDetailComponent } from './meal-table-detail.component';
import { MealTableUpdateComponent } from './meal-table-update.component';
import { MealTableDeletePopupComponent } from './meal-table-delete-dialog.component';
import { IMealTable } from 'app/shared/model/meal-table.model';

@Injectable({ providedIn: 'root' })
export class MealTableResolve implements Resolve<IMealTable> {
    constructor(private service: MealTableService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((mealTable: HttpResponse<MealTable>) => mealTable.body));
        }
        return of(new MealTable());
    }
}

export const mealTableRoute: Routes = [
    {
        path: 'meal-table',
        component: MealTableComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.mealTable.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'meal-table/:id/view',
        component: MealTableDetailComponent,
        resolve: {
            mealTable: MealTableResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.mealTable.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'meal-table/new',
        component: MealTableUpdateComponent,
        resolve: {
            mealTable: MealTableResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.mealTable.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'meal-table/:id/edit',
        component: MealTableUpdateComponent,
        resolve: {
            mealTable: MealTableResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.mealTable.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mealTablePopupRoute: Routes = [
    {
        path: 'meal-table/:id/delete',
        component: MealTableDeletePopupComponent,
        resolve: {
            mealTable: MealTableResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.mealTable.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
