import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SeekSharedModule } from 'app/shared';
import {
    AgentProvinceComponent,
    AgentProvinceDetailComponent,
    AgentProvinceUpdateComponent,
    AgentProvinceDeletePopupComponent,
    AgentProvinceDeleteDialogComponent,
    agentProvinceRoute,
    agentProvincePopupRoute
} from './';

const ENTITY_STATES = [...agentProvinceRoute, ...agentProvincePopupRoute];

@NgModule({
    imports: [SeekSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AgentProvinceComponent,
        AgentProvinceDetailComponent,
        AgentProvinceUpdateComponent,
        AgentProvinceDeleteDialogComponent,
        AgentProvinceDeletePopupComponent
    ],
    entryComponents: [
        AgentProvinceComponent,
        AgentProvinceUpdateComponent,
        AgentProvinceDeleteDialogComponent,
        AgentProvinceDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SeekAgentProvinceModule {}
