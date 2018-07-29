import { IUserExtra } from 'app/shared/model//user-extra.model';
import { IAgentProvince } from 'app/shared/model//agent-province.model';

export interface IAgentAdmin {
    id?: number;
    user?: IUserExtra;
    provinces?: IAgentProvince[];
}

export class AgentAdmin implements IAgentAdmin {
    constructor(public id?: number, public user?: IUserExtra, public provinces?: IAgentProvince[]) {}
}
