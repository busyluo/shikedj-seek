import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SeekSharedModule } from 'app/shared';
import {
    SealedBonusComponent,
    SealedBonusDetailComponent,
    SealedBonusUpdateComponent,
    SealedBonusDeletePopupComponent,
    SealedBonusDeleteDialogComponent,
    sealedBonusRoute,
    sealedBonusPopupRoute
} from './';

const ENTITY_STATES = [...sealedBonusRoute, ...sealedBonusPopupRoute];

@NgModule({
    imports: [SeekSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SealedBonusComponent,
        SealedBonusDetailComponent,
        SealedBonusUpdateComponent,
        SealedBonusDeleteDialogComponent,
        SealedBonusDeletePopupComponent
    ],
    entryComponents: [SealedBonusComponent, SealedBonusUpdateComponent, SealedBonusDeleteDialogComponent, SealedBonusDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SeekSealedBonusModule {}
