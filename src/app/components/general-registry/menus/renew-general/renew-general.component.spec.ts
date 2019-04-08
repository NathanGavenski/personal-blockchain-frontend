import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { GeneralRegistryService } from 'src/app/services/contracts/general/general-registry.service';
import { AuthService } from 'src/app/services/utils/auth-service.service';
import { GeneralDoc } from 'src/test-objects/Documents';
import { FireUser, UserModel } from 'src/test-objects/Users';
import { UserSerializableService } from '../../../../services/contracts/serialize/user/user-serializable.service';
import { RenewGeneralComponent } from './renew-general.component';

class MockAuthService {
  getLogingUser() {
    return Promise.resolve(FireUser);
  }
}

class MockUserService {
  getUser() {
    return Promise.resolve(UserModel);
  }
  getGeneralRegistry() {
    return Promise.resolve(GeneralDoc);
  }
}

class MockGeneralService {
  update() {
    return Promise.resolve();
  }
}

describe('RenewGeneralComponent', () => {
  let component: RenewGeneralComponent;
  let fixture: ComponentFixture<RenewGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RenewGeneralComponent
      ],
      imports: [
        FormsModule,
        BrowserModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: GeneralRegistryService, useClass: MockGeneralService },
        { provide: UserSerializableService, useClass: MockUserService },
        { provide: AuthService, useClass: MockAuthService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(RenewGeneralComponent);
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
    const createButton = compiled.querySelector('#update-button');
    resetForm();
    fixture.detectChanges();

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
    spyOn(MockGeneralService.prototype, 'update')
      .and.returnValue(Promise.resolve());

    populateForm();
    const compiled = fixture.nativeElement;
    const createButton = compiled.querySelector('#update-button');
    createButton.dispatchEvent(new Event('click'));
    tick();

    fixture.detectChanges();
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('general-registry/view');
  }));

  it('should trigger the service calls', fakeAsync(() => {
    spyOn(MockGeneralService.prototype, 'update').and.returnValue(Promise.resolve());
    spyOn(component.router, 'navigateByUrl').and.returnValue(true);
    populateForm();
    const compiled = fixture.nativeElement;
    const createButton = compiled.querySelector('#update-button');
    createButton.dispatchEvent(new Event('click'));
    tick();

    fixture.detectChanges();
    expect(MockGeneralService.prototype.update).toHaveBeenCalled();
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

  function resetForm() {
    component.formGroup.controls['fathersName'].setValue(null);
    component.formGroup.controls['mothersName'].setValue(null);
    component.formGroup.controls['nationality'].setValue(null);
    component.formGroup.controls['cpf'].setValue(null);
    component.formGroup.controls['pis'].setValue(null);
    component.formGroup.controls['marriedLicense'].setValue(null);
    component.formGroup.controls['photo'].setValue(null);
  }
});
