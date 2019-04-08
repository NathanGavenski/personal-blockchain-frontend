import { Component, OnInit } from '@angular/core';
import { NavHandlerService } from '../../services/utils/nav-handler.service';
import { GeneralRegistryService } from '../../services/contracts/general/general-registry.service';
import { SerializableService } from '../../services/contracts/serialize/serializable.service';
import { AuthService } from '../../services/utils/auth-service.service';
import { User as firebaseUser } from 'firebase';
import { Router } from '@angular/router';


@Component({
  selector: 'app-general-registry',
  templateUrl: './general-registry.component.html',
  styleUrls: ['./general-registry.component.scss']
})
export class GeneralRegistryComponent implements OnInit {

  public activate = true;
  public alreadyHave = this.generalRegistryService.alreadyHave;
  public path = 'general-registry';
  public route = true;

  constructor(
    public router: Router,
    private serialize: SerializableService,
    private nav: NavHandlerService,
    private generalRegistryService: GeneralRegistryService,
    private afAuth: AuthService
  ) { }

  ngOnInit() {
    this.nav.activate('general-registry');
    this.routeComponent();
  }

  private routeComponent() {
    this.afAuth.getLogingUser()
      .then((user: firebaseUser) => {
        this.generalRegistryService.lookUpId(user.uid)
          .then(response => {
            const eth_user = this.serialize.deserialize(response);
            if (eth_user.length === 1 && eth_user[0] === '0') {
              this.route = false;
              this.router.navigateByUrl(`${this.path}/activate`);
            } else {
              this.route = false;
              this.activate = false;
              this.alreadyHave = true;
              this.router.navigateByUrl(`${this.path}/view`);
            }
          });
      })
      .catch(() => {
        this.router.navigate(['']);
      });
  }
}
