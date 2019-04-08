import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StandardRegistryService } from '../../services/contracts/standard/standard-registry.service';
// Services
import { AuthService } from '../../services/utils/auth-service.service';
import { WindowRefService } from '../../services/utils/window-ref.service';
import { FormLists } from '../models/registerLists';
import { User } from '../models/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public user = new User(sessionStorage.getItem('mail'), sessionStorage.getItem('password'));
  public sex = new FormLists().sex;
  public states = new FormLists().states;
  public browser_window = this.winRef.nativeWindow;
  public martialStatus = new FormLists().martialStatus;

  constructor(
    public router: Router,
    private afAuth: AuthService,
    private winRef: WindowRefService,
    private contract: StandardRegistryService) { }

  public ngOnInit() {
    this.afAuth.getLogingUser().then(() => {
      this.router.navigate(['home']);
    }).catch(err => {
      console.log(`Erro: ${err}`);
    });
  }

  public passwordTypeChange() {
    const cb = document.getElementById('inputPassword');
    if (cb.getAttribute('type') === 'password') {
      cb.setAttribute('type', 'text');
    } else {
      cb.setAttribute('type', 'password');
    }
  }

  public signup(user) {
    this.contract.lookUp(user)
      .then(res => {
        if (res) {
          this.browser_window.alert('Você já possui um cadastro');
        } else {
          this.afAuth.signUpEmail(user)
            .then(response => {
              this.contract.createStandardRegestry(response, user)
                .then(() => {
                  this.afAuth.sendVerificationEmail();
                  this.router.navigate(['home']);
                }).catch(err => {
                  this.afAuth.deleteUser();
                });
            }).catch(error => {
              this.browser_window.alert(`Código: ${error.code}\nMensagem: ${error.message}`);
            });
        }
      }).catch(err => {
        console.log(`Erro: ${err}`);
      });
  }
}
