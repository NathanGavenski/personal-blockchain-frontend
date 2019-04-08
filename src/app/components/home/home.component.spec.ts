import { APP_BASE_HREF } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from 'src/app/services/utils/auth-service.service';
import { NavHandlerService } from 'src/app/services/utils/nav-handler.service';
import { FireUser } from 'src/test-objects/Users';
import { HomeComponent } from './home.component';

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

@Component({
  selector: 'app-view-general',
  template: ''
})
class MockViewGeneralComponent {
  @Input() hideButtons;
}

@Component({
  selector: 'app-view-birth',
  template: ''
})
class MockViewBirthComponent {
  @Input() hideButtons;
}

class MockAuthService {
  getLogingUser() {
    return Promise.resolve(FireUser);
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockViewGeneralComponent,
        MockViewBirthComponent,
        HomeComponent,
        MockSideBarComponent,
        MockNavBarComponent
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: APP_BASE_HREF, useValue: '/' },
        NavHandlerService
      ],
      imports: [
        FontAwesomeModule,
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show title when there are General Regestries', fakeAsync(() => {
    component.generalTitle = true;
    tick();

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const title = compiled.querySelector('#general-title');
    expect(title.innerHTML).toContain('Registro Geral');
  }));

  it('should show title when there are Birth Certificates', fakeAsync(() => {
    component.birthTitle = true;
    tick();

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const title = compiled.querySelector('#birth-title');
    expect(title.innerHTML).toContain('Certidão de Nascimento');
  }));
});
