import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faEnvelope, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';
import { NotificationSerializeService } from 'src/app/services/contracts/serialize/notification/notification-serialize.service';
import { AuthService } from 'src/app/services/utils/auth-service.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {

  public envelope = faEnvelope;
  public envelopeOpen = faEnvelopeOpen;

  constructor(
    router: Router,
    afAuth: AuthService,
    public notificationService: NotificationSerializeService
  ) {
    afAuth.getLogingUser()
      .catch(() => {
        router.navigate(['']);
      });

    notificationService.getNotifications();
  }

  public changeNotificationStatus(id) {
    this.notificationService.markRead(id);
  }

  public deleteNotification(id) {
    this.notificationService.markDeleted(id);
  }

}
