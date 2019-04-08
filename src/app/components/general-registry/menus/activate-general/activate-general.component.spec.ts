import { async, ComponentFixture, fakeAsync, TestBed, tick, flush } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { GeneralRegistryService } from 'src/app/services/contracts/general/general-registry.service';
import { AuthService } from 'src/app/services/utils/auth-service.service';
import { FireUser, UserModel } from 'src/test-objects/Users';
import { UserSerializableService } from '../../../../services/contracts/serialize/user/user-serializable.service';
import { ActivateGeneralComponent } from './activate-general.component';

class MockAuthService {
  getLogingUser() {
    return Promise.resolve(FireUser);
  }
}

class MockUserSerializableService {
  getUser() {
    return Promise.resolve(UserModel);
  }
}

class MockGeneralService {
  createGeneralRegestry() {
    return Promise.resolve();
  }
}

describe('ActivateGeneralComponent', () => {
  let component: ActivateGeneralComponent;
  let fixture: ComponentFixture<ActivateGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ActivateGeneralComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: GeneralRegistryService, useClass: MockGeneralService },
        { provide: UserSerializableService, useClass: MockUserSerializableService },
      ]
    })
      .compileComponents();

    spyOn(AuthService.prototype, 'getLogingUser').and.returnValue({ then: () => FireUser });
    spyOn(UserSerializableService.prototype, 'getUser').and.returnValue({ then: () => UserModel });
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(ActivateGeneralComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    tick();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate non optional camps', () => {
    const compiled = fixture.nativeElement;
    const createButton = compiled.querySelector('#create-button');

    expect(!!createButton.attributes['disabled']).toBeTruthy();

    component.formGroup.controls['marriedLicense'].setValue('01234567890');
    fixture.detectChanges();

    expect(!!createButton.attributes['disabled']).toBeTruthy();

    populateForm();
    fixture.detectChanges();

    expect(!!createButton.attributes['disabled']).toBeFalsy();
  });

  it('should navigate to view', fakeAsync(() => {
    spyOn(component.router, 'navigateByUrl')
      .and.returnValue(true);
    spyOn(MockGeneralService.prototype, 'createGeneralRegestry')
      .and.returnValue(Promise.resolve());

    populateForm();
    const compiled = fixture.nativeElement;
    const createButton = compiled.querySelector('#create-button');
    createButton.dispatchEvent(new Event('click'));
    flush();

    fixture.detectChanges();
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('general-registry/view');
  }));

  it('should trigger the service calls', fakeAsync(() => {
    spyOn(MockGeneralService.prototype, 'createGeneralRegestry').and.returnValue(Promise.resolve());
    spyOn(component.router, 'navigateByUrl').and.returnValue(true);
    populateForm();
    const compiled = fixture.nativeElement;
    const createButton = compiled.querySelector('#create-button');
    createButton.dispatchEvent(new Event('click'));
    tick();

    fixture.detectChanges();
    expect(MockGeneralService.prototype.createGeneralRegestry).toHaveBeenCalled();
  }));

  function populateForm() {
    component.formGroup.controls['fathersName'].setValue('test');
    component.formGroup.controls['mothersName'].setValue('test');
    component.formGroup.controls['nationality'].setValue('test');
    component.formGroup.controls['cpf'].setValue('test');
    component.formGroup.controls['pis'].setValue('test');
    component.formGroup.controls['marriedLicense'].setValue('test');
    component.formGroup.controls['photo'].setValue('test');
  }
});
