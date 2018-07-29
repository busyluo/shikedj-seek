import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MealOrder } from 'app/shared/model/meal-order.model';
import { MealOrderService } from './meal-order.service';
import { MealOrderComponent } from './meal-order.component';
import { MealOrderDetailComponent } from './meal-order-detail.component';
import { MealOrderUpdateComponent } from './meal-order-update.component';
import { MealOrderDeletePopupComponent } from './meal-order-delete-dialog.component';
import { IMealOrder } from 'app/shared/model/meal-order.model';

@Injectable({ providedIn: 'root' })
export class MealOrderResolve implements Resolve<IMealOrder> {
    constructor(private service: MealOrderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((mealOrder: HttpResponse<MealOrder>) => mealOrder.body));
        }
        return of(new MealOrder());
    }
}

export const mealOrderRoute: Routes = [
    {
        path: 'meal-order',
        component: MealOrderComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'seekApp.mealOrder.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'meal-order/:id/view',
        component: MealOrderDetailComponent,
        resolve: {
            mealOrder: MealOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.mealOrder.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'meal-order/new',
        component: MealOrderUpdateComponent,
        resolve: {
            mealOrder: MealOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.mealOrder.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'meal-order/:id/edit',
        component: MealOrderUpdateComponent,
        resolve: {
            mealOrder: MealOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.mealOrder.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mealOrderPopupRoute: Routes = [
    {
        path: 'meal-order/:id/delete',
        component: MealOrderDeletePopupComponent,
        resolve: {
            mealOrder: MealOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.mealOrder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
