import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User as firebaseUser } from 'firebase';
import { AuthService } from 'src/app/services/utils/auth-service.service';
import { GeneralRegistryService } from '../../../../services/contracts/general/general-registry.service';
import { UserSerializableService } from '../../../../services/contracts/serialize/user/user-serializable.service';
import { General } from '../../../models/general';
import { User } from '../../../models/user';

@Component({
  selector: 'app-renew-general',
  templateUrl: './renew-general.component.html',
  styleUrls: ['./renew-general.component.scss']
})
export class RenewGeneralComponent implements OnInit {

  public date: Date;
  public formGroup: FormGroup;
  public user: User = new User('', '');
  public document: General = new General('', '', '');

  private userId: firebaseUser;
  private generalRegistry: General;
  private path = 'general-registry';

  constructor(
    public router: Router,
    private afAuth: AuthService,
    private formBuilder: FormBuilder,
    private userSerializableService: UserSerializableService,
    private generalRegistryService: GeneralRegistryService
  ) {
    this.makeForm();
  }

  ngOnInit() {
    this.userSerializableService.getGeneralRegistry()
      .then((response: General) => {
        this.date = new Date(0);
        this.date.setUTCSeconds(Number(response.creationDate));
        this.document = response;
        this.makeForm();
      });

    this.userSerializableService.getUser()
      .then((response: User) => {
        this.user = response;
      });

    this.afAuth.getLogingUser()
      .then((user: firebaseUser) => {
        this.userId = user;
      });
  }

  public update() {
    this.generalRegistry = this.formGroup.getRawValue();
    const creationDate = this.getTodayDate();
    this.generalRegistryService.update(this.userId.uid, creationDate, this.generalRegistry)
      .then(() => {
        this.generalRegistryService.alreadyHave = true;
        this.router.navigateByUrl(`${this.path}/view`);
      })
      .catch((err) => {
        console.log(`Erro: ${err}`);
        window.alert('Algo deu errado, tente novamente mais tarde.');
      });
  }

  private getTodayDate(): string {
    const date = new Date();
    const day = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate();
    const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    return `${day}/${month}/${date.getFullYear()}`;
  }

  private makeForm() {
    this.formGroup = this.formBuilder.group({
      fathersName: [this.document.fathersName, Validators.required],
      mothersName: [this.document.mothersName, Validators.required],
      nationality: [this.document.nationality, Validators.required],
      cpf: [this.document.cpf, Validators.required],
      pis: [this.document.pis, Validators.required],
      marriedLicense: [((this.document.marriedLicense === 'N/A') ? null : this.document.marriedLicense)],
      photo: [null]
    });
  }

}
