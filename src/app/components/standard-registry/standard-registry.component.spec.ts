import { APP_BASE_HREF } from '@angular/common';
import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularFireModule } from 'angularfire2';
import { UserSerializableService } from 'src/app/services/contracts/serialize/user/user-serializable.service';
import { StandardRegistryService } from 'src/app/services/contracts/standard/standard-registry.service';
import { AuthService } from 'src/app/services/utils/auth-service.service';
import { NavHandlerService } from 'src/app/services/utils/nav-handler.service';
import { firebaseConfig } from 'src/environments/environment';
import { FireUser, UserModel } from 'src/test-objects/Users';
import { StandardRegistryComponent } from './standard-registry.component';

@Component({
  selector: 'app-navbar',
  template: ''
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

class MockUserService {
  getUser() {
    return Promise.resolve(UserModel);
  }
}

describe('StandardRegestryComponent', () => {
  let component: StandardRegistryComponent;
  let fixture: ComponentFixture<StandardRegistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StandardRegistryComponent,
        MockSideBarComponent,
        MockNavBarComponent
      ],
      imports: [
        FontAwesomeModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(firebaseConfig)
      ],
      providers: [
        NavHandlerService,
        StandardRegistryService,
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: AuthService, useClass: MockAuthService },
        { provide: UserSerializableService, useClass: MockUserService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
