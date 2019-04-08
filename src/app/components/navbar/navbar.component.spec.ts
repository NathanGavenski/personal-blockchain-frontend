import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BehaviorSubject } from 'rxjs';
import { NotificationSerializeService } from 'src/app/services/contracts/serialize/notification/notification-serialize.service';
import { AuthService } from 'src/app/services/utils/auth-service.service';
import { getNotification } from 'src/test-objects/Notifications';
import { FireUser } from 'src/test-objects/Users';
import { Notification } from '../models/notification';
import { NavbarComponent } from './navbar.component';

class MockAuthService {
  getLogingUser() {
    return Promise.resolve(FireUser);
  }

  logout() { }
}

class MockNotificationService {
  getNotifications() {
    return getNotification();
  }
}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavbarComponent
      ],
      imports: [
        FontAwesomeModule,
        RouterTestingModule
      ],
      providers: [
        { provide: NotificationSerializeService, useClass: MockNotificationService },
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: AuthService, useClass: MockAuthService },
      ]
    }).compileComponents();

    const notificationSpy: NotificationSerializeService = TestBed.get(NotificationSerializeService);
    const notificationList: Notification[] = getNotification();
    notificationSpy.userNotifications = new BehaviorSubject(notificationList);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update with the right amount of notification', fakeAsync(() => {
    component.ngOnInit();
    tick(900);

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#notification-nav').getAttribute('data-count')).toBe('1');
  }));

  it('should logout user', fakeAsync(() => {
    spyOn(MockAuthService.prototype, 'logout').and.returnValue(true);
    spyOn(component, 'windowReload').and.callFake(() => {});
    const compiled = fixture.nativeElement;
    const logoutButton = compiled.querySelector('#logout-icon');
    logoutButton.dispatchEvent(new Event('click'));
    tick();

    fixture.detectChanges();
    expect(MockAuthService.prototype.logout).toHaveBeenCalled();
  }));
});
