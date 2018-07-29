import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SeekSharedModule } from 'app/shared';
import {
    MealOrderItemComponent,
    MealOrderItemDetailComponent,
    MealOrderItemUpdateComponent,
    MealOrderItemDeletePopupComponent,
    MealOrderItemDeleteDialogComponent,
    mealOrderItemRoute,
    mealOrderItemPopupRoute
} from './';

const ENTITY_STATES = [...mealOrderItemRoute, ...mealOrderItemPopupRoute];

@NgModule({
    imports: [SeekSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MealOrderItemComponent,
        MealOrderItemDetailComponent,
        MealOrderItemUpdateComponent,
        MealOrderItemDeleteDialogComponent,
        MealOrderItemDeletePopupComponent
    ],
    entryComponents: [
        MealOrderItemComponent,
        MealOrderItemUpdateComponent,
        MealOrderItemDeleteDialogComponent,
        MealOrderItemDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SeekMealOrderItemModule {}
