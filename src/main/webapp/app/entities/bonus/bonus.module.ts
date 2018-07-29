import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SeekSharedModule } from 'app/shared';
import {
    BonusComponent,
    BonusDetailComponent,
    BonusUpdateComponent,
    BonusDeletePopupComponent,
    BonusDeleteDialogComponent,
    bonusRoute,
    bonusPopupRoute
} from './';

const ENTITY_STATES = [...bonusRoute, ...bonusPopupRoute];

@NgModule({
    imports: [SeekSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [BonusComponent, BonusDetailComponent, BonusUpdateComponent, BonusDeleteDialogComponent, BonusDeletePopupComponent],
    entryComponents: [BonusComponent, BonusUpdateComponent, BonusDeleteDialogComponent, BonusDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SeekBonusModule {}
