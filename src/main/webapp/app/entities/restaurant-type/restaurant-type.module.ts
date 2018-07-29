import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SeekSharedModule } from 'app/shared';
import {
    RestaurantTypeComponent,
    RestaurantTypeDetailComponent,
    RestaurantTypeUpdateComponent,
    RestaurantTypeDeletePopupComponent,
    RestaurantTypeDeleteDialogComponent,
    restaurantTypeRoute,
    restaurantTypePopupRoute
} from './';

const ENTITY_STATES = [...restaurantTypeRoute, ...restaurantTypePopupRoute];

@NgModule({
    imports: [SeekSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RestaurantTypeComponent,
        RestaurantTypeDetailComponent,
        RestaurantTypeUpdateComponent,
        RestaurantTypeDeleteDialogComponent,
        RestaurantTypeDeletePopupComponent
    ],
    entryComponents: [
        RestaurantTypeComponent,
        RestaurantTypeUpdateComponent,
        RestaurantTypeDeleteDialogComponent,
        RestaurantTypeDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SeekRestaurantTypeModule {}
