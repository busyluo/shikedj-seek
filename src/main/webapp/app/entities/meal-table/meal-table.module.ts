import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SeekSharedModule } from 'app/shared';
import {
    MealTableComponent,
    MealTableDetailComponent,
    MealTableUpdateComponent,
    MealTableDeletePopupComponent,
    MealTableDeleteDialogComponent,
    mealTableRoute,
    mealTablePopupRoute
} from './';

const ENTITY_STATES = [...mealTableRoute, ...mealTablePopupRoute];

@NgModule({
    imports: [SeekSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MealTableComponent,
        MealTableDetailComponent,
        MealTableUpdateComponent,
        MealTableDeleteDialogComponent,
        MealTableDeletePopupComponent
    ],
    entryComponents: [MealTableComponent, MealTableUpdateComponent, MealTableDeleteDialogComponent, MealTableDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SeekMealTableModule {}
