import { Birth } from 'src/app/components/models/birth';
import { User } from 'src/app/components/models/user';

export class ShareCN {

    public cpf?: string;
    public birthDate?: string;
    public hospitalName?: string;
    public cityOfBirth?: string;
    public fathersName?: string;
    public mothersName?: string;
    public fathersGrandmothersName?: string;
    public fathersGrandfathersName?: string;
    public mothersGrandmothersName?: string;
    public mothersGrandfathersName?: string;
    public name?: string;
    public lastname?: string;

    constructor(birth: Birth) {
        this.cpf = birth.cpf;
        this.birthDate = birth.birthDate;
        this.hospitalName = birth.hospitalName;
        this.cityOfBirth = birth.cityOfBirth;
        this.fathersName = birth.fathersName;
        this.mothersName = birth.mothersName;
        this.fathersGrandmothersName = birth.fathersGrandmothersName;
        this.fathersGrandfathersName = birth.fathersGrandfathersName;
        this.mothersGrandmothersName = birth.mothersGrandmothersName;
        this.mothersGrandfathersName = birth.mothersGrandfathersName;
    }

    public setNames(user: User) {
        this.name = user.name;
        this.lastname = user.lastName;
    }
}
