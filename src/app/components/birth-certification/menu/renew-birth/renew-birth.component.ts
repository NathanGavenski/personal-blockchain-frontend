import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { User } from 'src/app/components/models/user';
import { User as firebaseUser } from 'firebase';
import { Birth } from 'src/app/components/models/birth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/utils/auth-service.service';
import { BirthRegistryService } from 'src/app/services/contracts/birth/birth-registry.service';
import { UserSerializableService } from 'src/app/services/contracts/serialize/user/user-serializable.service';

@Component({
  selector: 'app-renew-birth',
  templateUrl: './renew-birth.component.html',
  styleUrls: ['./renew-birth.component.scss']
})
export class RenewBirthComponent {

  public date: Date;
  public formGroup: FormGroup;
  public user: User = new User('', '');
  public document: Birth = new Birth('', '', '');

  private path = 'birth-certification';

  constructor(
    public router: Router,
    private afAuth: AuthService,
    private formBuilder: FormBuilder,
    userSerializableService: UserSerializableService,
    private birthRegistryService: BirthRegistryService) {

    this.makeForm();
    userSerializableService.getBirthRegistry()
      .then((document: Birth) => {
        this.document = document;
        this.date = new Date(0);
        this.date.setUTCSeconds(Number(document.birthDate));
        this.makeForm();
      });
  }

  public async update() {
    const tokenUid = await this.afAuth.getLogingUser();
    const creationDate = this.getTodayDate();
    this.document = this.formGroup.getRawValue();
    this.document.birthDate = this.transformDateBlockchain(this.document.birthDate);
    this.birthRegistryService.update(tokenUid.uid, creationDate, this.document);
    this.birthRegistryService.updateAdditionalInfo(tokenUid.uid, this.document);
    this.router.navigateByUrl(`${this.path}/view`);
  }

  private getTodayDate(): string {
    const date = new Date();
    const day = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate();
    const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    return `${day}/${month}/${date.getFullYear()}`;
  }

  private transformDateForm(epochTime) {
    const date = new Date(0);
    date.setUTCSeconds(Number(epochTime));
    const day = (date.getDate() < 10) ? `0${date.getDate() + 1}` : date.getDate() + 1;
    const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    return `${date.getFullYear()}-${month}-${day}`;
  }

  private transformDateBlockchain(date: string) {
    const d = date.split('-');
    return `${d[2]}/${d[1]}/${d[0]}`;
  }

  private makeForm() {
    this.formGroup = this.formBuilder.group({
      birthDate: [this.transformDateForm(this.document.birthDate), Validators.required],
      hospitalName: [this.document.hospitalName, Validators.required],
      cityOfBirth: [this.document.cityOfBirth, Validators.required],
      fathersName: [this.document.fathersName, Validators.required],
      mothersName: [this.document.mothersName, Validators.required],
      fathersGrandmothersName: [this.document.fathersGrandmothersName, Validators.required],
      fathersGrandfathersName: [this.document.fathersGrandfathersName, Validators.required],
      mothersGrandmothersName: [this.document.mothersGrandmothersName, Validators.required],
      mothersGrandfathersName: [this.document.mothersGrandfathersName, Validators.required],
      cpf: [this.document.cpf]
    });

  }
}
