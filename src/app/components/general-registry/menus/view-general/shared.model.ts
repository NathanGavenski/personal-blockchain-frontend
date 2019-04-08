import { User } from 'src/app/components/models/user';
import { General } from 'src/app/components/models/general';

export class SharedRG {

    public fathersName: string;
    public mothersName: string;
    public nationality: string;
    public cpf?: string;
    public pis?: string;
    public marriedLicense?: string;
    public photo?: string;
    public creationDate?: string;
    public name?: string;
    public lastname?: string;

    constructor(general: General) {
        this.fathersName = general.fathersName;
        this.mothersName = general.mothersName;
        this.nationality = general.nationality;
        this.cpf = general.cpf;
        this.pis = general.pis;
        this.marriedLicense = general.marriedLicense;
        this.photo = general.photo;
        this.creationDate = general.creationDate;
    }

    public setNames(user: User) {
        this.name = user.name;
        this.lastname = user.lastName;
    }
}
