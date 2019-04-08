import { Component, Input } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SerializableService } from 'src/app/services/contracts/serialize/serializable.service';
import { FireUser } from 'src/test-objects/Users';
import { BirthRegistryService } from './../../services/contracts/birth/birth-registry.service';
import { AuthService } from './../../services/utils/auth-service.service';
import { NavHandlerService } from './../../services/utils/nav-handler.service';
import { BirthCertificationComponent } from './birth-certification.component';

@Component({
  selector: 'app-navbar',
  template: '<a id="birth-certification"></a>'
})
class MockNavBarComponent { }

@Component({
  selector: 'app-sidebar-nav',
  template: ''
})
class MockSideBarComponent {
  @Input() path;
  @Input() activate;
  @Input() alreadyHave;
  @Input() activateSon;
}

class MockAuthService {
  getLogingUser() {
    return Promise.resolve(FireUser);
  }
}

class MockBirthRegistryService {
  lookUpId() {
    return Promise.resolve();
  }
}

class MockSerializableService {
  deserialize() {
    return [];
  }
}

describe('BirthCertificationComponent', () => {

  let component: BirthCertificationComponent;
  let fixture: ComponentFixture<BirthCertificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BirthCertificationComponent,
        MockSideBarComponent,
        MockNavBarComponent
      ],
      providers: [
        NavHandlerService,
        { provide: AuthService, useClass: MockAuthService },
        { provide: SerializableService, useClass: MockSerializableService },
        { provide: BirthRegistryService, useClass: MockBirthRegistryService, useValue: { alreadyHave: true } },
      ],
      imports: [
        FontAwesomeModule,
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthCertificationComponent);
    component = fixture.componentInstance;
    spyOn(component.router, 'navigateByUrl').and.returnValue(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should activate NavBar', fakeAsync(() => {
    component.ngOnInit();
    tick();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#birth-certification').className).toContain('active');
  }));

  it('should route to activate', fakeAsync(() => {
    spyOn(MockSerializableService.prototype, 'deserialize').and.returnValue(['0', '0']);
    component.ngOnInit();
    tick();

    expect(component.route).toBeFalsy();
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('birth-certification/activate');
  }));

  it('should route to view', fakeAsync(() => {
    spyOn(MockSerializableService.prototype, 'deserialize').and.returnValue(['1', '1']);
    component.ngOnInit();
    tick();

    expect(component.route).toBeFalsy();
    expect(component.activate).toBeFalsy();
    expect(component.alreadyHave).toBeTruthy();
    expect(component.activateSon).toBeTruthy();
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('birth-certification/view');
  }));

});
