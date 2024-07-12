export class Account {
    public constructor(
        public login: string = '',
        public password: Password = { isVisible: false, value: '' },
        public type: AccountType = AccountType.LDAP,
        public labels: Labels = { value: '', parsed: [] },
    ) {}
}

export enum AccountType {
    LDAP = 'ldap',
    LOCAL = 'local'
}

export type Labels = {
    value: string
    parsed: Label[]
}

export type Label = {
    text: string
}

export type Password = {
    isVisible: boolean
    value: string
}
