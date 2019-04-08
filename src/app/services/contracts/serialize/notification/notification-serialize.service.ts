import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/utils/auth-service.service';
import { SerializableService } from '../serializable.service';
import { NotificationService } from '../../notification/notification.service';
import { Notification } from '../../../../components/models/notification';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NotificationSerializeService {

  public userNotifications: BehaviorSubject<Notification[]>;

  constructor(
    private afAuth: AuthService,
    private serialize: SerializableService,
    private notificationContract: NotificationService
  ) {
    this.userNotifications = new BehaviorSubject<Notification[]>([]);
  }

  public async getNotifications() {
    const tokenUid = await this.afAuth.getLogingUser();
    return new Promise((resolve) => {
      this.notificationContract.getMessagesIds(tokenUid.uid)
        .then((serializedIds: string) => {
          const ids: string[] = this.serialize.deserialize(serializedIds);
          if (ids.length > 0) {
            this.deserializeNotifications(ids, tokenUid);
            resolve(ids);
          } else {
            resolve([]);
          }
        });
    });
  }

  public async markRead(id) {
    const tokenUid = await this.afAuth.getLogingUser();
    this.notificationContract.markRead(tokenUid.uid, id);
    this.userNotifications.getValue().find((notification: Notification) => notification.id === id).setRead(true);
    this.userNotifications.next(this.userNotifications.getValue());
  }

  public async markDeleted(id) {
    const tokenUid = await this.afAuth.getLogingUser();
    this.notificationContract.markDeleted(tokenUid.uid, id);
    this.userNotifications.getValue().find((notification: Notification) => notification.id === id).setDeleted(true);
    this.userNotifications.next(this.userNotifications.getValue());
  }

  public getNonDeletedNotifications() {
    return this.userNotifications.getValue().filter((notification: Notification) => notification.deleted === false);
  }

  private deserializeNotifications(idList, tokenUid) {
    const notificationList = [];
    idList.map((id) => {
      this.notificationContract.getMessage(tokenUid.uid, id)
        .then((serializedMessage: string) => {
          const messageParams: string[] = this.serialize.deserialize(serializedMessage);
          const message = new Notification(id, messageParams[2], messageParams[1], messageParams[0]);

          this.setRead(tokenUid, id);
          this.setDeleted(tokenUid, id);
          notificationList.push(message);
        });
    });
    this.userNotifications.next(notificationList);
  }

  private setRead(tokenUid, id) {
    this.notificationContract.isRead(tokenUid.uid, id)
      .then(status => {
        this.userNotifications.getValue().find((notification: Notification) => notification.id === id).setRead(status);
      });
  }

  private setDeleted(tokenUid, id) {
    this.notificationContract.isDeleted(tokenUid.uid, id)
      .then(status => {
        this.userNotifications.getValue().find((notification: Notification) => notification.id === id).setDeleted(status);
      });
  }
}
