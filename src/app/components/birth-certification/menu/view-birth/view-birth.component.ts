import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Birth, SonsBirthCertificate } from 'src/app/components/models/birth';
import { User } from 'src/app/components/models/user';
import { BirthRegistryService } from 'src/app/services/contracts/birth/birth-registry.service';
import { UserSerializableService } from 'src/app/services/contracts/serialize/user/user-serializable.service';
import { AuthService } from 'src/app/services/utils/auth-service.service';
import { ShareCN } from './share.model';
import { SerializableService } from 'src/app/services/contracts/serialize/serializable.service';

@Component({
  selector: 'app-view-birth',
  templateUrl: './view-birth.component.html',
  styleUrls: ['./view-birth.component.scss']
})
export class ViewBirthComponent implements OnInit {

  @Input() hideButtons;
  @Output() documentTitleController: EventEmitter<any> = new EventEmitter();

  public tokenId: string;
  public status: boolean;
  public showModal = false;
  public formatedDate: string;
  public document: Birth = new Birth();
  public user: User = new User('', '');
  public sharedDocuments: ShareCN[] = [];

  constructor(
    private userSerializableService: UserSerializableService,
    private serializeService: SerializableService,
    private afAuth: AuthService,
    public birthService: BirthRegistryService
  ) {
    userSerializableService.getUser()
      .then((response: User) => {
        this.user = response;
      });
  }

  ngOnInit() {
    this.getOwnBirthRegistry();
    this.getSharedDocuments();
  }

  public cancel() {
    this.showModal = false;
  }

  public async shareDocument() {
    this.showModal = true;
    const tokenUid = await this.afAuth.getLogingUser();
    this.tokenId = tokenUid.uid;
  }

  public transformDate(epochTime) {
    const date = new Date(0);
    date.setUTCSeconds(Number(epochTime));
    const day = (date.getDate() < 10) ? `0${date.getDate() + 1}` : date.getDate() + 1;
    const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    return `${day}/${month}/${date.getFullYear()}`;
  }

  public async activateDoc() {
    const tokenUid = await this.afAuth.getLogingUser();
    this.birthService.approve(tokenUid.uid)
      .then(() => {
        this.getStatus();
      });
  }

  public async deactivateDoc() {
    const tokenUid = await this.afAuth.getLogingUser();
    this.birthService.negate(tokenUid.uid)
      .then(() => {
        this.getStatus();
      });
  }

  private getOwnBirthRegistry() {
    this.userSerializableService.getBirthRegistry()
      .then((response: Birth) => {
        if (response.birthDate) {
          this.getStatus();
          this.document = response;
          this.documentTitleController.emit({ show: true });
        } else {
          this.documentTitleController.emit({ show: false });
        }
        if (response.sonsIds.length > 0) {
          this.getSonsRegistries();
        }
      });
  }

  private getSonsRegistries() {
    this.document.sonsIds.map((element) => {
      this.userSerializableService.getSonsBirthRegistry(Number(element))
        .then((sonsResponse: SonsBirthCertificate) => {
          this.document.addSon(sonsResponse);
        })
        .catch(() => {
          alert('Algo errado aconteceu. Tente novamente mais tarde');
        });
    });
  }

  private async getSharedDocuments() {
    const tokenUid = await this.afAuth.getLogingUser();
    this.birthService.getSharedDocument(tokenUid.uid)
      .then((idSharedDocs: string) => {
        const desSharedDoc = this.serializeService.deserialize(idSharedDocs);
        if (desSharedDoc.length > 0) {
          desSharedDoc.map((element: string) => {
            this.userSerializableService.getSpecificBirthRegistry(element)
              .then((birthDoc: Birth) => {
                const sharedBirthDoc = new ShareCN(birthDoc);
                this.userSerializableService.getSpecificUser(element)
                  .then((user: User) => {
                    sharedBirthDoc.setNames(user);
                    this.sharedDocuments.push(sharedBirthDoc);
                  });
              });
          });
        }
      });
  }

  private getStatus() {
    this.userSerializableService.getBirthRegistryStatus()
      .then((status: boolean) => {
        this.status = status;
      });
  }

}
