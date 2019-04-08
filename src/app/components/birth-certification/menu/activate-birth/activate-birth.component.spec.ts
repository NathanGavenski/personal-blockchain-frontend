import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { BirthRegistryService } from 'src/app/services/contracts/birth/birth-registry.service';
import { AuthService } from 'src/app/services/utils/auth-service.service';
import { FireUser } from 'src/test-objects/Users';
import { ActivateBirthComponent } from './activate-birth.component';

class MockAuthService {
  getLogingUser() {
    return Promise.resolve(FireUser);
  }
}

class MockBirthRegistryService {
  create() {
    return Promise.resolve();
  }
}

describe('ActivateBirthComponent', () => {
  let component: ActivateBirthComponent;
  let fixture: ComponentFixture<ActivateBirthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ActivateBirthComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: BirthRegistryService, useClass: MockBirthRegistryService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(ActivateBirthComponent);
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
    const createButton = compiled.querySelector('#create-button');
    createButton.dispatchEvent(new Event('click'));
    tick();

    fixture.detectChanges();
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('birth-certification/view');
  }));

  it('should trigger the service calls', fakeAsync(() => {
    spyOn(MockBirthRegistryService.prototype, 'create').and.returnValue(Promise.resolve());
    spyOn(component.router, 'navigateByUrl').and.returnValue(true);
    populateForm();
    const compiled = fixture.nativeElement;
    const createButton = compiled.querySelector('#create-button');
    createButton.dispatchEvent(new Event('click'));
    tick();

    fixture.detectChanges();
    expect(MockBirthRegistryService.prototype.create).toHaveBeenCalled();
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
