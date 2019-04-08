import { Notification } from 'src/app/components/models/notification';

export function getNotification() {
    const notification: Notification = new Notification('1', 'system', 'BIRTH_CREATE_SUCCESS', '769737600');
    notification.setRead(true);
    notification.setDeleted(false);

    const notification2: Notification = new Notification('2', 'Luiz', 'GENERAL_UPDATE', '769737600');
    notification2.setRead(false);
    notification2.setDeleted(false);
    return [notification, notification2];
}
