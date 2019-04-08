export class Birth {

    constructor(
        public cpf?: string,
        public birthDate?: string,
        public hospitalName?: string,
        public cityOfBirth?: string,
        public fathersName?: string,
        public mothersName?: string,
        public fathersGrandmothersName?: string,
        public fathersGrandfathersName?: string,
        public mothersGrandmothersName?: string,
        public mothersGrandfathersName?: string,
        public status?: boolean,
        public sonsIds?: string[],
        public sons?: SonsBirthCertificate[]
    ) { }

    updateStatus(status) {
        this.status = status;
    }

    addSonId(sonId: string) {
        if (!this.sonsIds) {
            this.sonsIds = [];
        }
        this.sonsIds.push(sonId);
    }

    addSon(son: SonsBirthCertificate) {
        if (!this.sons) {
            this.sons = [];
        }
        this.sons.push(son);
    }
}

export class SonsBirthCertificate {
    constructor(
        public cpf?: string,
        public name?: string,
        public familyName?: string,
        public birthDate?: string,
        public hospitalName?: string,
        public cityOfBirth?: string,
        public fathersName?: string,
        public mothersName?: string,
        public fathersGrandmothersName?: string,
        public fathersGrandfathersName?: string,
        public mothersGrandmothersName?: string,
        public mothersGrandfathersName?: string,
        public status?: boolean
    ) { }

    updateStatus(status) {
        this.status = status;
    }
}
