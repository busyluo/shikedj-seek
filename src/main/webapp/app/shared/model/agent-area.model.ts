import { IBonusPool } from 'app/shared/model//bonus-pool.model';
import { IRestaurant } from 'app/shared/model//restaurant.model';
import { IAgentProvince } from 'app/shared/model//agent-province.model';
import { IAgent } from 'app/shared/model//agent.model';

export interface IAgentArea {
    id?: number;
    name?: string;
    bonusPool?: IBonusPool;
    restaurants?: IRestaurant[];
    province?: IAgentProvince;
    agent?: IAgent;
}

export class AgentArea implements IAgentArea {
    constructor(
        public id?: number,
        public name?: string,
        public bonusPool?: IBonusPool,
        public restaurants?: IRestaurant[],
        public province?: IAgentProvince,
        public agent?: IAgent
    ) {}
}
