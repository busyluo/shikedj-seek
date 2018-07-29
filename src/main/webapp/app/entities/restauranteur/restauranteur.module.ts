import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SeekSharedModule } from 'app/shared';
import {
    RestauranteurComponent,
    RestauranteurDetailComponent,
    RestauranteurUpdateComponent,
    RestauranteurDeletePopupComponent,
    RestauranteurDeleteDialogComponent,
    restauranteurRoute,
    restauranteurPopupRoute
} from './';

const ENTITY_STATES = [...restauranteurRoute, ...restauranteurPopupRoute];

@NgModule({
    imports: [SeekSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RestauranteurComponent,
        RestauranteurDetailComponent,
        RestauranteurUpdateComponent,
        RestauranteurDeleteDialogComponent,
        RestauranteurDeletePopupComponent
    ],
    entryComponents: [
        RestauranteurComponent,
        RestauranteurUpdateComponent,
        RestauranteurDeleteDialogComponent,
        RestauranteurDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SeekRestauranteurModule {}
