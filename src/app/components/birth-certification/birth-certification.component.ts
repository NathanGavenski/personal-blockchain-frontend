import { Component, OnInit } from '@angular/core';
import { NavHandlerService } from '../../services/utils/nav-handler.service';
import { Router } from '@angular/router';
import { SerializableService } from 'src/app/services/contracts/serialize/serializable.service';
import { AuthService } from 'src/app/services/utils/auth-service.service';
import { User as firebaseUser } from 'firebase';
import { BirthRegistryService } from 'src/app/services/contracts/birth/birth-registry.service';

@Component({
  selector: 'app-birth-certification',
  templateUrl: './birth-certification.component.html',
  styleUrls: ['./birth-certification.component.scss']
})
export class BirthCertificationComponent implements OnInit {

  public route = true;
  public activate = true;
  public activateSon = false;
  public path = 'birth-certification';
  public alreadyHave = this.birthRegistryService.alreadyHave;

  constructor(
    public router: Router,
    private serialize: SerializableService,
    private nav: NavHandlerService,
    private afAuth: AuthService,
    private birthRegistryService: BirthRegistryService,
  ) { }

  public ngOnInit() {
    this.nav.activate('birth-certification');
    this.routeComponent();
  }

  private routeComponent() {
    this.afAuth.getLogingUser()
      .then((user: firebaseUser) => {
        this.birthRegistryService.lookUpId(user.uid)
          .then(response => {
            const eth_user = this.serialize.deserialize(response);
            if (eth_user.length === 2 && eth_user[0] === '0') {
              this.route = false;
              this.router.navigateByUrl(`${this.path}/activate`);
            } else {
              this.route = false;
              this.activate = false;
              this.alreadyHave = true;
              this.activateSon = true;
              this.router.navigateByUrl(`${this.path}/view`);
            }
          });
      })
      .catch(() => {
        this.router.navigate(['']);
      });
  }
}
