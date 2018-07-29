import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SeekSharedModule } from 'app/shared';
import {
    BankTransferComponent,
    BankTransferDetailComponent,
    BankTransferUpdateComponent,
    BankTransferDeletePopupComponent,
    BankTransferDeleteDialogComponent,
    bankTransferRoute,
    bankTransferPopupRoute
} from './';

const ENTITY_STATES = [...bankTransferRoute, ...bankTransferPopupRoute];

@NgModule({
    imports: [SeekSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BankTransferComponent,
        BankTransferDetailComponent,
        BankTransferUpdateComponent,
        BankTransferDeleteDialogComponent,
        BankTransferDeletePopupComponent
    ],
    entryComponents: [
        BankTransferComponent,
        BankTransferUpdateComponent,
        BankTransferDeleteDialogComponent,
        BankTransferDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SeekBankTransferModule {}
