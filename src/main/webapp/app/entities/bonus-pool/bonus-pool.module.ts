import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SeekSharedModule } from 'app/shared';
import {
    BonusPoolComponent,
    BonusPoolDetailComponent,
    BonusPoolUpdateComponent,
    BonusPoolDeletePopupComponent,
    BonusPoolDeleteDialogComponent,
    bonusPoolRoute,
    bonusPoolPopupRoute
} from './';

const ENTITY_STATES = [...bonusPoolRoute, ...bonusPoolPopupRoute];

@NgModule({
    imports: [SeekSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BonusPoolComponent,
        BonusPoolDetailComponent,
        BonusPoolUpdateComponent,
        BonusPoolDeleteDialogComponent,
        BonusPoolDeletePopupComponent
    ],
    entryComponents: [BonusPoolComponent, BonusPoolUpdateComponent, BonusPoolDeleteDialogComponent, BonusPoolDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SeekBonusPoolModule {}
