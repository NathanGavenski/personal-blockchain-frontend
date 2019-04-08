// Classes and components
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Services
import { AuthService } from '../../services/utils/auth-service.service';
import { WindowRefService } from '../../services/utils/window-ref.service';
import { User } from '../models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public browser_window = this.winRef.nativeWindow;
  public user = new User('', '', '', '');

  constructor(
    private winRef: WindowRefService,
    private afAuth: AuthService,
    public router: Router
  ) { }

  public ngOnInit() {
    sessionStorage.clear();
    this.afAuth.getLogingUser()
      .then(() => {
        this.router.navigate(['home']);
      })
      .catch(() => { });
  }

  public login(user) {
    if (!user.mail && !user.password) {
      window.alert('Favor informar um usuário e senha');
    } else if (!user.mail) {
      window.alert('Favor informar um usuário');
    } else if (!user.password) {
      window.alert('Favor informar uma senha');
    } else {
      this.afAuth.login(user)
        .then(() => {
          this.router.navigate(['home']);
        }).catch(error => {
          window.alert(`Código: ${error.code}\nMensagem: ${error.message}`);
        });
    }
  }

  public signup(user) {
    if (user) {
      if (user.mail || user.mail) {
        sessionStorage.setItem('mail', user.mail);
      }
      if (user.password || user.password) {
        sessionStorage.setItem('password', user.password);
      }
      this.router.navigate(['register']);
    }
  }
}
