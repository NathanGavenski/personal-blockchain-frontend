import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { BirthRegistryService } from 'src/app/services/contracts/birth/birth-registry.service';
import { GeneralRegistryService } from 'src/app/services/contracts/general/general-registry.service';
import { SerializableService } from 'src/app/services/contracts/serialize/serializable.service';
import { StandardRegistryService } from 'src/app/services/contracts/standard/standard-registry.service';
import { UserSerializableService } from 'src/app/services/contracts/serialize/user/user-serializable.service';
import { AuthService } from 'src/app/services/utils/auth-service.service';
import { firebaseConfig } from 'src/environments/environment';
import { SonCertificateComponent } from './son-certificate.component';


describe('SonCertificateComponent', () => {
  let component: SonCertificateComponent;
  let fixture: ComponentFixture<SonCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SonCertificateComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(firebaseConfig)
      ],
      providers: [
        AuthService,
        UserSerializableService,
        SerializableService,
        StandardRegistryService,
        GeneralRegistryService,
        BirthRegistryService,
        AngularFireAuth,
        { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SonCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
