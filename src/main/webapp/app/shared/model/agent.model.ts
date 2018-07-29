import { IUserExtra } from 'app/shared/model//user-extra.model';
import { IAgentArea } from 'app/shared/model//agent-area.model';

export interface IAgent {
    id?: number;
    user?: IUserExtra;
    areas?: IAgentArea[];
}

export class Agent implements IAgent {
    constructor(public id?: number, public user?: IUserExtra, public areas?: IAgentArea[]) {}
}
