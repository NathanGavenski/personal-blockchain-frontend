// Angular
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Bootstrap and Fontawesome
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Other Services
import { WindowRefService } from './services/utils/window-ref.service';
import { NavHandlerService } from './services/utils/nav-handler.service';
import { UserSerializableService } from './services/contracts/serialize/user/user-serializable.service';
import { SerializableService } from './services/contracts/serialize/serializable.service';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ShareModalComponent } from './components/share-modal/share-modal.component';

// Notification
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NotificationService } from './services/contracts/notification/notification.service';

// Standard
import { StandardRegistryComponent } from './components/standard-registry/standard-registry.component';
import { StandardRegistryService } from './services/contracts/standard/standard-registry.service';

// Birth Certificate
import { BirthRegistryService } from './services/contracts/birth/birth-registry.service';
import { ViewBirthComponent } from './components/birth-certification/menu/view-birth/view-birth.component';
import { BirthCertificationComponent } from './components/birth-certification/birth-certification.component';
import { RenewBirthComponent } from './components/birth-certification/menu/renew-birth/renew-birth.component';
import { ActivateBirthComponent } from './components/birth-certification/menu/activate-birth/activate-birth.component';
import { SonCertificateComponent } from './components/birth-certification/menu/son-certificate/son-certificate.component';
import { SharedCertificateComponent } from './components/birth-certification/menu/view-birth/shared-certificate/shared-certificate.component';
import { GuardianCertificateComponent } from './components/birth-certification/menu/view-birth/guardian-certificate/guardian-certificate.component';

// RG
import { GeneralRegistryService } from './services/contracts/general/general-registry.service';
import { GeneralRegistryComponent } from './components/general-registry/general-registry.component';
import { ActivateGeneralComponent } from './components/general-registry/menus/activate-general/activate-general.component';
import { ViewGeneralComponent } from './components/general-registry/menus/view-general/view-general.component';
import { RenewGeneralComponent } from './components/general-registry/menus/renew-general/renew-general.component';

// Login and Signup templates
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

// Navs
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarNavComponent } from './components/sidebar-nav/sidebar-nav.component';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from '../environments/environment';
import { AuthService } from './services/utils/auth-service.service';
import { AppRoutingModule } from '../app-routing.module';
import { NotificationSerializeService } from './services/contracts/serialize/notification/notification-serialize.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    SidebarNavComponent,
    StandardRegistryComponent,

    GeneralRegistryComponent,
    ActivateGeneralComponent,
    ViewGeneralComponent,
    RenewGeneralComponent,

    BirthCertificationComponent,
    ActivateBirthComponent,
    RenewBirthComponent,
    ViewBirthComponent,
    SharedCertificateComponent,
    GuardianCertificateComponent,
    SonCertificateComponent,

    NotificationsComponent,
    ShareModalComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,

    FontAwesomeModule,
    NgbModule,

    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,

    RouterModule,

    AppRoutingModule
  ],
  providers: [
    AuthService,
    WindowRefService,
    NavHandlerService,
    SerializableService,
    UserSerializableService,
    StandardRegistryService,
    GeneralRegistryService,
    BirthRegistryService,
    NotificationService,
    NotificationSerializeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
