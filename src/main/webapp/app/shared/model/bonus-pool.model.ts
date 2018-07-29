import { Moment } from 'moment';
import { IAgentArea } from 'app/shared/model//agent-area.model';

export interface IBonusPool {
    id?: number;
    date?: Moment;
    used?: number;
    total?: number;
    area?: IAgentArea;
}

export class BonusPool implements IBonusPool {
    constructor(public id?: number, public date?: Moment, public used?: number, public total?: number, public area?: IAgentArea) {}
}
