import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User as firebaseUser } from 'firebase';
import { Birth } from 'src/app/components/models/birth';
import { BirthRegistryService } from 'src/app/services/contracts/birth/birth-registry.service';
import { AuthService } from 'src/app/services/utils/auth-service.service';

@Component({
  selector: 'app-activate-birth',
  templateUrl: './activate-birth.component.html',
  styleUrls: ['./activate-birth.component.scss']
})
export class ActivateBirthComponent implements OnInit {

  public formGroup: FormGroup;
  private birthRegistry: Birth;
  private userId: firebaseUser;
  private path = 'birth-certification';

  constructor(
    public router: Router,
    private afAuth: AuthService,
    private formBuilder: FormBuilder,
    private birthRegistryService: BirthRegistryService
  ) {
    this.makeForm();
  }

  public ngOnInit() {
    this.afAuth.getLogingUser()
      .then((user: firebaseUser) => {
        this.userId = user;
      })
      .catch(() => {
        window.alert('Algo deu errado, tente novamente mais tarde.');
      });
  }

  create() {
    this.birthRegistry = this.formGroup.getRawValue();
    this.birthRegistry.birthDate = this.transformBirthDate(this.birthRegistry.birthDate);

    const creationDate = this.getCreationDate();

    this.birthRegistryService
      .create(this.userId.uid, creationDate, this.birthRegistry)
      .then(() => {
        this.birthRegistryService.alreadyHave = true;
        this.router.navigateByUrl(`${this.path}/view`);
      })
      .catch(() => {
        window.alert('Algo deu errado, tente novamente mais tarde.');
      });
  }

  setAddress() {
    this.birthRegistryService
      .setStandardAddress('0xf12b5dd4ead5f743c6baa640b0216200e89b60da')
      .then((res) => {
        console.log(`Certo: ${res}`);
      })
      .catch((err) => {
        console.log(`Erro: ${err}`);
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

  private makeForm() {
    this.formGroup = this.formBuilder.group({
      birthDate: [null, Validators.required],
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
