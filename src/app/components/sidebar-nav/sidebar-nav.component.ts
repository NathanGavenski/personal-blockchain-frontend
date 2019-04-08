import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.scss']
})
export class SidebarNavComponent {

  @Input() path: string;
  @Input() activate: string;
  @Input() alreadyHave: boolean;
  @Input() activateSon = false;
}
