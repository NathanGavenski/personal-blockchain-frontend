import { async, ComponentFixture, fakeAsync, TestBed, tick, flush } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ShareModalComponent } from 'src/app/components/share-modal/share-modal.component';
import { BirthRegistryService } from 'src/app/services/contracts/birth/birth-registry.service';
import { SerializableService } from 'src/app/services/contracts/serialize/serializable.service';
import { UserSerializableService } from 'src/app/services/contracts/serialize/user/user-serializable.service';
import { AuthService } from 'src/app/services/utils/auth-service.service';
import { BirthDoc, SonBirthDoc, getSharedBirthDoc } from 'src/test-objects/Documents';
import { FireUser, UserModel } from 'src/test-objects/Users';
import { GuardianCertificateComponent } from './guardian-certificate/guardian-certificate.component';
import { SharedCertificateComponent } from './shared-certificate/shared-certificate.component';
import { ViewBirthComponent } from './view-birth.component';

class MockAuthService {
  getLogingUser() {
    return Promise.resolve(FireUser);
  }
}

class MockBirthService {
  getSharedDocument() {
    return Promise.resolve('0x0');
  }
}

class MockUserService {
  getUser() {
    return Promise.resolve(UserModel);
  }

  getBirthRegistry() {
    return Promise.resolve(BirthDoc);
  }

  getSonsRegistries() {
    return Promise.resolve(SonBirthDoc);
  }

  getBirthRegistryStatus() {
    return Promise.resolve(true);
  }
}

describe('ViewBirthComponent', () => {
  let component: ViewBirthComponent;
  let fixture: ComponentFixture<ViewBirthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ViewBirthComponent,
        GuardianCertificateComponent,
        SharedCertificateComponent,
        ShareModalComponent
      ],
      providers: [
        SerializableService,
        { provide: UserSerializableService, useClass: MockUserService },
        { provide: BirthRegistryService, useClass: MockBirthService },
        { provide: AuthService, useClass: MockAuthService }
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(ViewBirthComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    flush();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger the service calls', fakeAsync(() => {
    // spyOn(MockUserService.prototype, 'getUser')
    // spyOn(MockUserService.prototype, 'getBirthRegistry')
    // spyOn(MockUserService.prototype, 'getSonsRegistries')
    // spyOn(MockUserService.prototype, 'getBirthRegistryStatus')
    // spyOn(MockBirthService.prototype, 'getSharedDocument')
    // tick();

    // fixture.detectChanges();
    // expect(MockUserService.prototype.getBirthRegistry).toHaveBeenCalled();
    // expect(MockUserService.prototype.getBirthRegistryStatus).toHaveBeenCalled();
    // expect(MockUserService.prototype.getSonsRegistries).toHaveBeenCalled();
    // expect(MockUserService.prototype.getUser).toHaveBeenCalled();
    // expect(MockBirthService.prototype.getSharedDocument).toHaveBeenCalled();
  }));

  it('should show Birth Certificate', fakeAsync(() => {
    const compiled = fixture.nativeElement;
    const certificate = compiled.querySelector('#birth-certificate-card');

    expect(!!certificate).toBeTruthy();
  }));
});
