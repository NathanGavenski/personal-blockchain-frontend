import { User } from '../models/user';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/utils/auth-service.service';
import { NavHandlerService } from '../../services/utils/nav-handler.service';
import { UserSerializableService } from '../../services/contracts/serialize/user/user-serializable.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StandardRegistryService } from 'src/app/services/contracts/standard/standard-registry.service';

@Component({
  selector: 'app-standard-registry',
  templateUrl: './standard-registry.component.html',
  styleUrls: ['./standard-registry.component.scss']
})
export class StandardRegistryComponent implements OnInit {

  public formGroup: FormGroup;
  public user = new User('', '');

  constructor(
    private router: Router,
    private afAuth: AuthService,
    private nav: NavHandlerService,
    private formBuilder: FormBuilder,
    private userSerialize: UserSerializableService,
    private standardService: StandardRegistryService) {

  }

  ngOnInit() {
    this.nav.activate('');
    this.afAuth.getLogingUser().catch(() => {
      this.router.navigate(['']);
    });

    this.makeForm();

    this.userSerialize.getUser()
      .then((user: User) => {
        this.user = user;
        this.makeForm();
      });
  }

  public async update() {
    const user = this.formGroup.getRawValue();
    const tokenUid = await this.afAuth.getLogingUser();
    this.standardService.update(tokenUid.uid, this.transformDate(user.birthDate), user)
      .then(() => {
        this.enableUpdate();
      });
  }

  passwordTypeChange() {
    const cb = document.getElementById('inputPassword');
    if (cb.getAttribute('type') === 'password') {
      cb.setAttribute('type', 'text');
    } else {
      cb.setAttribute('type', 'password');
    }
  }

  enableUpdate() {
    const button = (<HTMLInputElement>document.getElementById('firstButton'));
    if (button.value === 'habilitar') {
      this.enable(button);
    } else {
      this.disable(button);
    }
  }

  enable(button) {
    const list = document.getElementsByClassName('form-control');
    Array.prototype.forEach.call(list, function (item) {
      item.removeAttribute('readonly');
    });
    button.value = 'desabilitar';
    button.textContent = 'Desabilitar campos';
    button.className = button.className.replace('btn-success', 'btn-secondary');

    this.removeAttributes();
  }

  disable(button) {
    const list = document.getElementsByClassName('form-control');
    Array.prototype.forEach.call(list, function (item) {
      item.setAttribute('readonly', '');
    });
    button.value = 'habilitar';
    button.textContent = 'habilitar campos';
    button.className = button.className.replace('btn-secondary', 'btn-success');

    this.insertAttibutes();
  }

  removeAttributes() {
    const buttonAlter = document.getElementById('buttonAlter');
    buttonAlter.removeAttribute('disabled');
    buttonAlter.removeAttribute('hidden');
    buttonAlter.className = buttonAlter.className.replace('btn-secondary', 'btn-success');

    const inputHelp = document.getElementById('passwordHelp');
    inputHelp.removeAttribute('hidden');
  }

  insertAttibutes() {
    const buttonAlter = document.getElementById('buttonAlter');
    buttonAlter.setAttribute('disabled', '');
    buttonAlter.setAttribute('hidden', '');
    buttonAlter.className = buttonAlter.className.replace('btn-success', 'btn-secondary');

    const inputHelp = document.getElementById('passwordHelp');
    inputHelp.setAttribute('hidden', '');
  }

  private transformDate(epochTime) {
    const date = new Date(0);
    date.setUTCSeconds(Number(epochTime));
    const day = (date.getDate() < 10) ? `0${date.getDate() + 1}` : date.getDate() + 1;
    const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    return `${day}/${month}/${date.getFullYear()}`;
  }

  private makeForm() {
    this.formGroup = this.formBuilder.group({
      name: [this.user.name],
      familyName: [this.user.lastName],
      phone: [this.user.telephone],
      birthDate: [this.user.birthday],
      add: [this.user.address],
      add_comp: [this.user.addressNumber],
      city: [this.user.city],
      state: [this.user.state],
      zip: [this.user.zip],
      mail: [this.user.mail]
    });
  }

}
