import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Restauranteur } from 'app/shared/model/restauranteur.model';
import { RestauranteurService } from './restauranteur.service';
import { RestauranteurComponent } from './restauranteur.component';
import { RestauranteurDetailComponent } from './restauranteur-detail.component';
import { RestauranteurUpdateComponent } from './restauranteur-update.component';
import { RestauranteurDeletePopupComponent } from './restauranteur-delete-dialog.component';
import { IRestauranteur } from 'app/shared/model/restauranteur.model';

@Injectable({ providedIn: 'root' })
export class RestauranteurResolve implements Resolve<IRestauranteur> {
    constructor(private service: RestauranteurService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((restauranteur: HttpResponse<Restauranteur>) => restauranteur.body));
        }
        return of(new Restauranteur());
    }
}

export const restauranteurRoute: Routes = [
    {
        path: 'restauranteur',
        component: RestauranteurComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.restauranteur.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'restauranteur/:id/view',
        component: RestauranteurDetailComponent,
        resolve: {
            restauranteur: RestauranteurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.restauranteur.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'restauranteur/new',
        component: RestauranteurUpdateComponent,
        resolve: {
            restauranteur: RestauranteurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.restauranteur.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'restauranteur/:id/edit',
        component: RestauranteurUpdateComponent,
        resolve: {
            restauranteur: RestauranteurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.restauranteur.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const restauranteurPopupRoute: Routes = [
    {
        path: 'restauranteur/:id/delete',
        component: RestauranteurDeletePopupComponent,
        resolve: {
            restauranteur: RestauranteurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.restauranteur.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
