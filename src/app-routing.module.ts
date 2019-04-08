import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BirthCertificationComponent } from './app/components/birth-certification/birth-certification.component';
import { ActivateBirthComponent } from './app/components/birth-certification/menu/activate-birth/activate-birth.component';
import { SonCertificateComponent } from './app/components/birth-certification/menu/son-certificate/son-certificate.component';
import { RenewBirthComponent } from './app/components/birth-certification/menu/renew-birth/renew-birth.component';
import { ViewBirthComponent } from './app/components/birth-certification/menu/view-birth/view-birth.component';
import { GeneralRegistryComponent } from './app/components/general-registry/general-registry.component';
import { ActivateGeneralComponent } from './app/components/general-registry/menus/activate-general/activate-general.component';
import { RenewGeneralComponent } from './app/components/general-registry/menus/renew-general/renew-general.component';
import { ViewGeneralComponent } from './app/components/general-registry/menus/view-general/view-general.component';
import { HomeComponent } from './app/components/home/home.component';
import { LoginComponent } from './app/components/login/login.component';
import { NotificationsComponent } from './app/components/notifications/notifications.component';
import { RegisterComponent } from './app/components/register/register.component';
import { StandardRegistryComponent } from './app/components/standard-registry/standard-registry.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }, {
    path: 'home',
    component: HomeComponent
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'register',
    component: RegisterComponent
  }, {
    path: 'std-registry',
    component: StandardRegistryComponent
  }, {
    path: 'general-registry',
    component: GeneralRegistryComponent,
    children: [{
      path: 'activate',
      component: ActivateGeneralComponent
    }, {
      path: 'view',
      component: ViewGeneralComponent
    }, {
      path: 'renew',
      component: RenewGeneralComponent
    }]
  }, {
    path: 'birth-certification',
    component: BirthCertificationComponent,
    children: [{
      path: 'activate',
      component: ActivateBirthComponent
    }, {
      path: 'view',
      component: ViewBirthComponent
    }, {
      path: 'renew',
      component: RenewBirthComponent
    },
    {
      path: 'activate-son',
      component: SonCertificateComponent
    }]
  }, {
    path: 'notifications',
    component: NotificationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
