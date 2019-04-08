import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { StandardRegistryService } from 'src/app/services/contracts/standard/standard-registry.service';
import { AuthService } from 'src/app/services/utils/auth-service.service';
import { WindowRefService } from 'src/app/services/utils/window-ref.service';
import { FireUser } from 'src/test-objects/Users';
import { RegisterComponent } from './register.component';

class MockAuthService {
  getLogingUser() {
    return Promise.resolve(FireUser);
  }
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegisterComponent
      ],
      imports: [
        FormsModule,
        BrowserModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        WindowRefService,
        StandardRegistryService,
        { provide: AuthService, useClass: MockAuthService },
      ]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;

    spyOn(component.router, 'navigate').and.returnValue(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
