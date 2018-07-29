import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MealOrderItem } from 'app/shared/model/meal-order-item.model';
import { MealOrderItemService } from './meal-order-item.service';
import { MealOrderItemComponent } from './meal-order-item.component';
import { MealOrderItemDetailComponent } from './meal-order-item-detail.component';
import { MealOrderItemUpdateComponent } from './meal-order-item-update.component';
import { MealOrderItemDeletePopupComponent } from './meal-order-item-delete-dialog.component';
import { IMealOrderItem } from 'app/shared/model/meal-order-item.model';

@Injectable({ providedIn: 'root' })
export class MealOrderItemResolve implements Resolve<IMealOrderItem> {
    constructor(private service: MealOrderItemService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((mealOrderItem: HttpResponse<MealOrderItem>) => mealOrderItem.body));
        }
        return of(new MealOrderItem());
    }
}

export const mealOrderItemRoute: Routes = [
    {
        path: 'meal-order-item',
        component: MealOrderItemComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.mealOrderItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'meal-order-item/:id/view',
        component: MealOrderItemDetailComponent,
        resolve: {
            mealOrderItem: MealOrderItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.mealOrderItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'meal-order-item/new',
        component: MealOrderItemUpdateComponent,
        resolve: {
            mealOrderItem: MealOrderItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.mealOrderItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'meal-order-item/:id/edit',
        component: MealOrderItemUpdateComponent,
        resolve: {
            mealOrderItem: MealOrderItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.mealOrderItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mealOrderItemPopupRoute: Routes = [
    {
        path: 'meal-order-item/:id/delete',
        component: MealOrderItemDeletePopupComponent,
        resolve: {
            mealOrderItem: MealOrderItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.mealOrderItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
