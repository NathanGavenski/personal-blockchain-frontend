import { Component, HostListener, OnInit } from '@angular/core';
import { faAddressCard, faBell, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { NotificationSerializeService } from 'src/app/services/contracts/serialize/notification/notification-serialize.service';
import { AuthService } from '../../services/utils/auth-service.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  bell = faBell;
  user = faUser;
  card = faAddressCard;
  signOutIcon = faSignOutAlt;

  private unreadNotifications;
  private unreadNumber;

  constructor(
    private afAuth: AuthService,
    private notificationsService: NotificationSerializeService
  ) {
    this.notificationsService.getNotifications();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resize(event.target.innerWidth);
  }

  public ngOnInit() {
    const width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    this.resize(width);
    this.notificationsService.userNotifications.subscribe(notifications => {
      this.unreadNotifications = notifications;
      setTimeout(() => { this.setUnreadNotificationsNumber(); }, 900);
    });
  }

  private setUnreadNotificationsNumber() {
    this.unreadNumber = this.unreadNotifications.filter((notification) => {
      if (notification.read === false && notification.deleted === false) {
        return notification;
      }
    }).length;
    if (this.unreadNumber > 0) {
      document.getElementById('notification-nav').setAttribute('data-count', this.unreadNumber);
    } else {
      document.getElementById('notification-nav').removeAttribute('data-count');
    }
  }

  public signOut() {
    this.afAuth.logout();
    this.windowReload();
  }

  public windowReload() {
    window.location.reload();
  }

  private resize(size) {
    const el = (<HTMLElement>document.querySelector('.last-icon'));
    if (size < 990) {
      el.style.marginLeft = ' 15px';
    } else if (el.style.marginLeft !== '28px') {
      el.style.marginLeft = '28px';
    }
  }

}
