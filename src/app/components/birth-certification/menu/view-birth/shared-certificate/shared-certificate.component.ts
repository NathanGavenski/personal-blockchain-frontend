import { Component, Input } from '@angular/core';
import { ShareCN } from '../share.model';

@Component({
  selector: 'app-shared-certificate',
  templateUrl: './shared-certificate.component.html',
  styleUrls: ['./shared-certificate.component.scss']
})
export class SharedCertificateComponent {

  @Input() shared: ShareCN;

  public transformDate(epochTime) {
    const date = new Date(0);
    date.setUTCSeconds(Number(epochTime));
    const day = (date.getDate() < 10) ? `0${date.getDate() + 1}` : date.getDate() + 1;
    const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    return `${day}/${month}/${date.getFullYear()}`;
  }

}
