import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SeekSharedModule } from 'app/shared';
import {
    MealOrderComponent,
    MealOrderDetailComponent,
    MealOrderUpdateComponent,
    MealOrderDeletePopupComponent,
    MealOrderDeleteDialogComponent,
    mealOrderRoute,
    mealOrderPopupRoute
} from './';

const ENTITY_STATES = [...mealOrderRoute, ...mealOrderPopupRoute];

@NgModule({
    imports: [SeekSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MealOrderComponent,
        MealOrderDetailComponent,
        MealOrderUpdateComponent,
        MealOrderDeleteDialogComponent,
        MealOrderDeletePopupComponent
    ],
    entryComponents: [MealOrderComponent, MealOrderUpdateComponent, MealOrderDeleteDialogComponent, MealOrderDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SeekMealOrderModule {}
