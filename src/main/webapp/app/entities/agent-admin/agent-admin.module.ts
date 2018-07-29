import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SeekSharedModule } from 'app/shared';
import {
    AgentAdminComponent,
    AgentAdminDetailComponent,
    AgentAdminUpdateComponent,
    AgentAdminDeletePopupComponent,
    AgentAdminDeleteDialogComponent,
    agentAdminRoute,
    agentAdminPopupRoute
} from './';

const ENTITY_STATES = [...agentAdminRoute, ...agentAdminPopupRoute];

@NgModule({
    imports: [SeekSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AgentAdminComponent,
        AgentAdminDetailComponent,
        AgentAdminUpdateComponent,
        AgentAdminDeleteDialogComponent,
        AgentAdminDeletePopupComponent
    ],
    entryComponents: [AgentAdminComponent, AgentAdminUpdateComponent, AgentAdminDeleteDialogComponent, AgentAdminDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SeekAgentAdminModule {}
