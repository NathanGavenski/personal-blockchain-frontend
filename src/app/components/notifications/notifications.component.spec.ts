import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BehaviorSubject } from 'rxjs';
import { NotificationSerializeService } from 'src/app/services/contracts/serialize/notification/notification-serialize.service';
import { AuthService } from 'src/app/services/utils/auth-service.service';
import { getNotification } from 'src/test-objects/Notifications';
import { FireUser } from 'src/test-objects/Users';
import { Notification } from '../models/notification';
import { NotificationsComponent } from './notifications.component';

@Component({
  selector: 'app-navbar',
  template: ''
})
class MockNavBarComponent { }

class MockAuthService {
  getLogingUser() {
    return Promise.resolve(FireUser);
  }
}

class MockNotificationService {
  getNotifications() {
    return Promise.resolve(['1', '2']);
  }

  getNonDeletedNotifications() {
    return getNotification();
  }

  markRead() {
    return Promise.resolve(true);
  }

  markDeleted() {
    return Promise.resolve(true);
  }
}

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockNavBarComponent,
        NotificationsComponent
      ],
      imports: [
        FontAwesomeModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: NotificationSerializeService, useClass: MockNotificationService }
      ]
    }).compileComponents();

    const notificationSpy: NotificationSerializeService = TestBed.get(NotificationSerializeService);
    const notificationList: Notification[] = getNotification();
    notificationSpy.userNotifications = new BehaviorSubject(notificationList);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark as readed', fakeAsync(() => {
    spyOn(MockNotificationService.prototype, 'markRead');

    const compiled = fixture.nativeElement;
    const readButton = compiled.querySelector('#markAsRead');
    readButton.dispatchEvent(new Event('click'));
    tick();

    fixture.detectChanges();
    expect(MockNotificationService.prototype.markRead).toHaveBeenCalled();
  }));

  it('should mark as deleted', fakeAsync(() => {
    spyOn(MockNotificationService.prototype, 'markDeleted');

    const compiled = fixture.nativeElement;
    const readButton = compiled.querySelector('#markAsDeleted');
    readButton.dispatchEvent(new Event('click'));
    tick();

    fixture.detectChanges();
    expect(MockNotificationService.prototype.markDeleted).toHaveBeenCalled();
  }));

  it('should appear no message text', fakeAsync(() => {
    spyOn(MockNotificationService.prototype, 'getNonDeletedNotifications').and.returnValue([]);
    tick();

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.notifications-msg').innerHTML).toContain('Você não tem notificações :C');
  }));

  it('should contain notifications', fakeAsync(() => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('.notification').length).toBe(2);
  }));
});
