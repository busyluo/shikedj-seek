import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SeekSharedModule } from 'app/shared';
import {
    AgentAreaComponent,
    AgentAreaDetailComponent,
    AgentAreaUpdateComponent,
    AgentAreaDeletePopupComponent,
    AgentAreaDeleteDialogComponent,
    agentAreaRoute,
    agentAreaPopupRoute
} from './';

const ENTITY_STATES = [...agentAreaRoute, ...agentAreaPopupRoute];

@NgModule({
    imports: [SeekSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AgentAreaComponent,
        AgentAreaDetailComponent,
        AgentAreaUpdateComponent,
        AgentAreaDeleteDialogComponent,
        AgentAreaDeletePopupComponent
    ],
    entryComponents: [AgentAreaComponent, AgentAreaUpdateComponent, AgentAreaDeleteDialogComponent, AgentAreaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SeekAgentAreaModule {}
