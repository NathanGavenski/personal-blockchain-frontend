import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BirthRegistryService } from 'src/app/services/contracts/birth/birth-registry.service';
import { SerializableService } from 'src/app/services/contracts/serialize/serializable.service';
import { UserSerializableService } from 'src/app/services/contracts/serialize/user/user-serializable.service';
import { AuthService } from 'src/app/services/utils/auth-service.service';
import { BirthDoc } from 'src/test-objects/Documents';
import { FireUser } from 'src/test-objects/Users';
import { RenewBirthComponent } from './renew-birth.component';

class MockAuthService {
  getLogingUser() {
    return Promise.resolve(FireUser);
  }
}

class MockUserService {
  getBirthRegistry() {
    return Promise.resolve(BirthDoc);
  }
}

class MockBirthRegistryService {
  update() {
    return Promise.resolve();
  }
  updateAdditionalInfo() {
    return Promise.resolve();
  }
}

describe('RenewBirthComponent', () => {
  let component: RenewBirthComponent;
  let fixture: ComponentFixture<RenewBirthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RenewBirthComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        FontAwesomeModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: AuthService, useClass: MockAuthService },
        { provide: BirthRegistryService, useClass: MockBirthRegistryService },
        { provide: UserSerializableService, useClass: MockUserService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewBirthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate non optional camps', () => {
    const compiled = fixture.nativeElement;
    const createButton = compiled.querySelector('#update-button');

    expect(!!createButton.attributes['disabled']).toBeTruthy();

    component.formGroup.controls['cpf'].setValue('01234567890');
    fixture.detectChanges();

    expect(!!createButton.attributes['disabled']).toBeTruthy();

    populateForm();
    fixture.detectChanges();

    expect(!!createButton.attributes['disabled']).toBeFalsy();
  });

  it('should navigate to view', fakeAsync(() => {
    spyOn(component.router, 'navigateByUrl').and.returnValue(true);
    populateForm();
    const compiled = fixture.nativeElement;
    const createButton = compiled.querySelector('#update-button');
    createButton.dispatchEvent(new Event('click'));
    tick();

    fixture.detectChanges();
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('birth-certification/view');
  }));

  it('should trigger the service calls', fakeAsync(() => {
    spyOn(MockBirthRegistryService.prototype, 'update');
    spyOn(MockBirthRegistryService.prototype, 'updateAdditionalInfo');
    spyOn(component.router, 'navigateByUrl').and.returnValue(true);
    populateForm();
    const compiled = fixture.nativeElement;
    const createButton = compiled.querySelector('#update-button');
    createButton.dispatchEvent(new Event('click'));
    tick();

    fixture.detectChanges();
    expect(MockBirthRegistryService.prototype.update).toHaveBeenCalled();
    expect(MockBirthRegistryService.prototype.updateAdditionalInfo).toHaveBeenCalled();
  }));

  function populateForm() {
    component.formGroup.controls['birthDate'].setValue('24/02/1993');
    component.formGroup.controls['hospitalName'].setValue('test');
    component.formGroup.controls['cityOfBirth'].setValue('test');
    component.formGroup.controls['fathersName'].setValue('test');
    component.formGroup.controls['mothersName'].setValue('test');
    component.formGroup.controls['fathersGrandmothersName'].setValue('test');
    component.formGroup.controls['fathersGrandfathersName'].setValue('test');
    component.formGroup.controls['mothersGrandmothersName'].setValue('test');
    component.formGroup.controls['mothersGrandfathersName'].setValue('test');
  }
});
