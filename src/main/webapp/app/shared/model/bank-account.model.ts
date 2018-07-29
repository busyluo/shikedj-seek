export interface IBankAccount {
    id?: number;
    bankName?: string;
    bankBranch?: string;
    bankID?: string;
}

export class BankAccount implements IBankAccount {
    constructor(public id?: number, public bankName?: string, public bankBranch?: string, public bankID?: string) {}
}
