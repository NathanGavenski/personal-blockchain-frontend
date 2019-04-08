import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedCertificateComponent } from './shared-certificate.component';
import { getSharedBirthDoc } from 'src/test-objects/Documents';


describe('SharedCertificateComponent', () => {
  let component: SharedCertificateComponent;
  let fixture: ComponentFixture<SharedCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedCertificateComponent);
    fixture.componentInstance.shared = getSharedBirthDoc();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
