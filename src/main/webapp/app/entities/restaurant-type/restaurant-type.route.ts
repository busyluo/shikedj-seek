import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RestaurantType } from 'app/shared/model/restaurant-type.model';
import { RestaurantTypeService } from './restaurant-type.service';
import { RestaurantTypeComponent } from './restaurant-type.component';
import { RestaurantTypeDetailComponent } from './restaurant-type-detail.component';
import { RestaurantTypeUpdateComponent } from './restaurant-type-update.component';
import { RestaurantTypeDeletePopupComponent } from './restaurant-type-delete-dialog.component';
import { IRestaurantType } from 'app/shared/model/restaurant-type.model';

@Injectable({ providedIn: 'root' })
export class RestaurantTypeResolve implements Resolve<IRestaurantType> {
    constructor(private service: RestaurantTypeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((restaurantType: HttpResponse<RestaurantType>) => restaurantType.body));
        }
        return of(new RestaurantType());
    }
}

export const restaurantTypeRoute: Routes = [
    {
        path: 'restaurant-type',
        component: RestaurantTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.restaurantType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'restaurant-type/:id/view',
        component: RestaurantTypeDetailComponent,
        resolve: {
            restaurantType: RestaurantTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.restaurantType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'restaurant-type/new',
        component: RestaurantTypeUpdateComponent,
        resolve: {
            restaurantType: RestaurantTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.restaurantType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'restaurant-type/:id/edit',
        component: RestaurantTypeUpdateComponent,
        resolve: {
            restaurantType: RestaurantTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.restaurantType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const restaurantTypePopupRoute: Routes = [
    {
        path: 'restaurant-type/:id/delete',
        component: RestaurantTypeDeletePopupComponent,
        resolve: {
            restaurantType: RestaurantTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.restaurantType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
