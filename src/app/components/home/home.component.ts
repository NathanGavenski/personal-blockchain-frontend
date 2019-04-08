import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/utils/auth-service.service';
import { NavHandlerService } from '../../services/utils/nav-handler.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public generalTitle = false;
  public birthTitle = false;

  constructor(
    private afAuth: AuthService,
    private router: Router,
    private nav: NavHandlerService
  ) { }

  ngOnInit() {
    this.nav.activate('home');
    this.afAuth.getLogingUser()
      .catch(() => {
        this.router.navigate(['']);
      });
  }

  public hideGeneralTitle($event) {
    this.generalTitle = $event.show;
  }

  public hideBirthTitle($event) {
    this.birthTitle = $event.show;
  }
}
