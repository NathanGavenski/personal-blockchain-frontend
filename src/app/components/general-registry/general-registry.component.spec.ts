import { Component, Input } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GeneralRegistryService } from 'src/app/services/contracts/general/general-registry.service';
import { SerializableService } from 'src/app/services/contracts/serialize/serializable.service';
import { AuthService } from 'src/app/services/utils/auth-service.service';
import { NavHandlerService } from 'src/app/services/utils/nav-handler.service';
import { FireUser } from 'src/test-objects/Users';
import { GeneralRegistryComponent } from './general-registry.component';

@Component({
  selector: 'app-navbar',
  template: '<a id="general-registry"></a>'
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

class MockGeneralRegistryService {
  lookUpId() {
    return Promise.resolve();
  }
}

class MockSerializableService {
  deserialize() {
    return [];
  }
}

describe('GeneralRegistryComponent', () => {
  let component: GeneralRegistryComponent;
  let fixture: ComponentFixture<GeneralRegistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GeneralRegistryComponent,
        MockSideBarComponent,
        MockNavBarComponent
      ],
      providers: [
        NavHandlerService,
        { provide: AuthService, useClass: MockAuthService },
        { provide: SerializableService, useClass: MockSerializableService },
        { provide: GeneralRegistryService, useClass: MockGeneralRegistryService }
      ],
      imports: [
        FontAwesomeModule,
        RouterTestingModule
      ]
    }).compileComponents();

    spyOn(AuthService.prototype, 'getLogingUser')
      .and.returnValues(Promise.resolve(FireUser));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralRegistryComponent);
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
    expect(compiled.querySelector('#general-registry').className).toContain('active');
  }));

  it('should route to activate', fakeAsync(() => {
    spyOn(MockSerializableService.prototype, 'deserialize').and.returnValue(['0']);
    component.ngOnInit();
    tick();

    expect(component.route).toBeFalsy();
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('general-registry/activate');
  }));

  it('should route to view', fakeAsync(() => {
    spyOn(MockSerializableService.prototype, 'deserialize').and.returnValue(['1', '1']);
    component.ngOnInit();
    tick();

    expect(component.route).toBeFalsy();
    expect(component.activate).toBeFalsy();
    expect(component.alreadyHave).toBeTruthy();
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('general-registry/view');
  }));
});
