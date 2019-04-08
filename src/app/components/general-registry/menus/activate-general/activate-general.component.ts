import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User as firebaseUser } from 'firebase';
import { User } from 'src/app/components/models/user';
import { GeneralRegistryService } from '../../../../services/contracts/general/general-registry.service';
import { UserSerializableService } from '../../../../services/contracts/serialize/user/user-serializable.service';
import { AuthService } from '../../../../services/utils/auth-service.service';
import { General } from '../../../models/general';

@Component({
  selector: 'app-activate-general',
  templateUrl: './activate-general.component.html',
  styleUrls: ['./activate-general.component.scss']
})
export class ActivateGeneralComponent implements OnInit {

  public formGroup: FormGroup;
  public user: User = new User('', '');
  public userId: firebaseUser;
  private generalRegistry: General;
  private path = 'general-registry';

  constructor(

    public router: Router,
    private afAuth: AuthService,
    private formBuilder: FormBuilder,
    private accountService: UserSerializableService,
    private generalRegistryService: GeneralRegistryService
  ) {
    this.makeForm();
  }

  public ngOnInit() {
    this.afAuth.getLogingUser()
      .then((user: firebaseUser) => {
        this.userId = user;
      });

    this.accountService.getUser()
      .then((user: User) => {
        this.user = user;
      });
  }

  create() {
    this.generalRegistry = this.formGroup.getRawValue();
    const date = new Date();
    const day = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate();
    const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const creationDate = `${day}/${month}/${date.getFullYear()}`;
    this.generalRegistryService
      .createGeneralRegestry(this.userId.uid, creationDate, this.generalRegistry)
      .then(() => {
        this.generalRegistryService.alreadyHave = true;
        this.router.navigateByUrl(`${this.path}/view`);
      })
      .catch(() => {
        window.alert('Algo deu errado, tente novamente mais tarde.');
      });
  }

  teste2() {
    this.generalRegistryService
      .setStandardAddress('0xf12b5dd4ead5f743c6baa640b0216200e89b60da')
      .then((res) => {
        console.log(`Certo: ${res}`);
      })
      .catch((err) => {
        console.log(`Erro: ${err}`);
      });
  }

  private makeForm() {
    this.formGroup = this.formBuilder.group({
      fathersName: [null, Validators.required],
      mothersName: [null, Validators.required],
      nationality: [null, Validators.required],
      cpf: [null, Validators.required],
      pis: [null, Validators.required],
      marriedLicense: [null],
      photo: [null]
    });
  }
}
