import { IProvince } from 'app/shared/model//province.model';
import { IAgentArea } from 'app/shared/model//agent-area.model';
import { IAgentAdmin } from 'app/shared/model//agent-admin.model';

export interface IAgentProvince {
    id?: number;
    name?: string;
    province?: IProvince;
    areas?: IAgentArea[];
    agent?: IAgentAdmin;
}

export class AgentProvince implements IAgentProvince {
    constructor(
        public id?: number,
        public name?: string,
        public province?: IProvince,
        public areas?: IAgentArea[],
        public agent?: IAgentAdmin
    ) {}
}
