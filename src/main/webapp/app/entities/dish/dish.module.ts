import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SeekSharedModule } from 'app/shared';
import {
    DishComponent,
    DishDetailComponent,
    DishUpdateComponent,
    DishDeletePopupComponent,
    DishDeleteDialogComponent,
    dishRoute,
    dishPopupRoute
} from './';

const ENTITY_STATES = [...dishRoute, ...dishPopupRoute];

@NgModule({
    imports: [SeekSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [DishComponent, DishDetailComponent, DishUpdateComponent, DishDeleteDialogComponent, DishDeletePopupComponent],
    entryComponents: [DishComponent, DishUpdateComponent, DishDeleteDialogComponent, DishDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SeekDishModule {}
