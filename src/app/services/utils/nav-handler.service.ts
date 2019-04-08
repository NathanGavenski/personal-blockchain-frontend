import { Injectable } from '@angular/core';

@Injectable()
export class NavHandlerService {

  public activate(menu) {
    this.deactivate();
    if (menu) {
      const element = document.getElementById(menu);
      if (element) {
        element.className += ' active';
      }
    }
  }

  private deactivate() {
    const items = document.getElementsByClassName('nav-link');
    Array.prototype.forEach.call(items, function (item) {
      const classes = item.className;
      if (classes.match('active')) {
        item.className = classes.replace('active', '');
      }
    });
  }


}
