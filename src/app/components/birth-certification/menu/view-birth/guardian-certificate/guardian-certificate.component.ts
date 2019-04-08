import { Component, Input } from '@angular/core';
import { SonsBirthCertificate } from 'src/app/components/models/birth';

@Component({
  selector: 'app-guardian-certificate',
  templateUrl: './guardian-certificate.component.html',
  styleUrls: ['./guardian-certificate.component.scss']
})
export class GuardianCertificateComponent {

  @Input() son: SonsBirthCertificate;

  public transformDate(epochTime) {
    const date = new Date(0);
    date.setUTCSeconds(Number(epochTime));
    const day = (date.getDate() < 10) ? `0${date.getDate() + 1}` : date.getDate() + 1;
    const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    return `${day}/${month}/${date.getFullYear()}`;
  }
}
