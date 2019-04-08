import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User as firebaseUser } from 'firebase';
import { Birth } from 'src/app/components/models/birth';
import { BirthRegistryService } from 'src/app/services/contracts/birth/birth-registry.service';
import { AuthService } from 'src/app/services/utils/auth-service.service';

@Component({
  selector: 'app-son-certificate',
  templateUrl: './son-certificate.component.html',
  styleUrls: ['./son-certificate.component.scss']
})
export class SonCertificateComponent {

  public formGroup: FormGroup;
  private birthRegistry: Birth;
  private userId: firebaseUser;
  private path = 'birth-certification';

  constructor(
    private router: Router,
    private afAuth: AuthService,
    private formBuilder: FormBuilder,
    private birthRegistryService: BirthRegistryService
  ) {
    this.makeForm();
    this.afAuth.getLogingUser()
      .then((user: firebaseUser) => {
        this.userId = user;
      });
  }

  create() {
    this.birthRegistry = this.formGroup.getRawValue();
    this.birthRegistry.birthDate = this.transformBirthDate(this.birthRegistry.birthDate);
    const creationDate = this.getCreationDate();

    this.birthRegistryService.createSon(this.userId.uid, creationDate, this.birthRegistry)
      .then(() => {
        this.birthRegistryService.alreadyHave = true;
        this.router.navigateByUrl(`${this.path}/view`);
      })
      .catch((err) => {
        console.log(`Erro: ${err}`);
        window.alert('Algo deu errado, tente novamente mais tarde.');
      });
  }

  private transformBirthDate(dateOld) {
    const dateNew = dateOld.split('-');
    return `${dateNew[2]}/${dateNew[1]}/${dateNew[0]}`;
  }

  private getCreationDate() {
    const date = new Date();
    const day = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate();
    const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    return `${day}/${month}/${date.getFullYear()}`;
  }

  private getTodayDate(): string {
    const date = new Date();
    const day = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate();
    const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    return `${date.getFullYear()}-${month}-${day}`;
  }

  private makeForm() {
    this.formGroup = this.formBuilder.group({
      name: [null, Validators.required],
      familyName: [null, Validators.required],
      birthDate: [this.getTodayDate(), Validators.required],
      hospitalName: [null, Validators.required],
      cityOfBirth: [null, Validators.required],
      fathersName: [null, Validators.required],
      mothersName: [null, Validators.required],
      fathersGrandmothersName: [null, Validators.required],
      fathersGrandfathersName: [null, Validators.required],
      mothersGrandmothersName: [null, Validators.required],
      mothersGrandfathersName: [null, Validators.required],
      cpf: [null]
    });
  }

}
