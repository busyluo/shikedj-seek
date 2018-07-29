import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dish } from 'app/shared/model/dish.model';
import { DishService } from './dish.service';
import { DishComponent } from './dish.component';
import { DishDetailComponent } from './dish-detail.component';
import { DishUpdateComponent } from './dish-update.component';
import { DishDeletePopupComponent } from './dish-delete-dialog.component';
import { IDish } from 'app/shared/model/dish.model';

@Injectable({ providedIn: 'root' })
export class DishResolve implements Resolve<IDish> {
    constructor(private service: DishService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((dish: HttpResponse<Dish>) => dish.body));
        }
        return of(new Dish());
    }
}

export const dishRoute: Routes = [
    {
        path: 'dish',
        component: DishComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.dish.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'dish/:id/view',
        component: DishDetailComponent,
        resolve: {
            dish: DishResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.dish.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'dish/new',
        component: DishUpdateComponent,
        resolve: {
            dish: DishResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.dish.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'dish/:id/edit',
        component: DishUpdateComponent,
        resolve: {
            dish: DishResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.dish.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dishPopupRoute: Routes = [
    {
        path: 'dish/:id/delete',
        component: DishDeletePopupComponent,
        resolve: {
            dish: DishResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.dish.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
