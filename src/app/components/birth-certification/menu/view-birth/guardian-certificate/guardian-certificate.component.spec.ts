import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SonsBirthCertificate } from '../../../../models/birth';
import { GuardianCertificateComponent } from './guardian-certificate.component';

describe('GuardianCertificateComponent', () => {
  let component: GuardianCertificateComponent;
  let fixture: ComponentFixture<GuardianCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GuardianCertificateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardianCertificateComponent);
    component = fixture.componentInstance;
    component.son = new SonsBirthCertificate('123', 'nome', 'familia', '24/02/1993',
      'hospital', 'cidade', 'pai', 'mae', 'avo paterna', 'avo paterno', 'avo materna', 'avo materno', true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
