import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { GeneralRegistryService } from 'src/app/services/contracts/general/general-registry.service';
import { AuthService } from 'src/app/services/utils/auth-service.service';
import { GeneralDoc, getSharedGeneralDoc } from 'src/test-objects/Documents';
import { FireUser, UserModel } from 'src/test-objects/Users';
import { UserSerializableService } from '../../../../services/contracts/serialize/user/user-serializable.service';
import { ViewGeneralComponent } from './view-general.component';

@Component({
  selector: 'app-share-modal',
  template: ''
})
class MockShareComponent {
  @Input() document;
  @Input() documentService;
}

class MockUserService {
  getUser() {
    return Promise.resolve(UserModel);
  }
  getGeneralRegistry() {
    return Promise.resolve(GeneralDoc);
  }
  getGeneralRegistryStatus() {
    return Promise.resolve(true);
  }
  getSharedGeneralRegistry() {
    return Promise.resolve(['1', '2']);
  }
  getSpecificGeneralRegistry() {
    return Promise.resolve(getSharedGeneralDoc()[0]);
  }
  getSpecificUser() {
    return Promise.resolve(UserModel);
  }
}

class MockAuthService {
  getLogingUser() {
    return Promise.resolve(FireUser);
  }
}

class MockGeneralService {
  approve() {
    return { then: () => { } };
  }
  negate() {
    return { then: () => { } };
  }
}

describe('ViewGeneralComponent', () => {
  let component: ViewGeneralComponent;
  let fixture: ComponentFixture<ViewGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ViewGeneralComponent,
        MockShareComponent
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: GeneralRegistryService, useClass: MockGeneralService },
        { provide: UserSerializableService, useClass: MockUserService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGeneralComponent);
    component = fixture.componentInstance;

    spyOn(component.documentTitleController, 'emit').and.returnValue(true);
    fixture.detectChanges();
  });

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

  it('should show General Registry', fakeAsync(() => {
    component.document = GeneralDoc;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const registry = compiled.querySelector('#general-registry-card');

    expect(!!registry).toBeTruthy();
  }));
});
