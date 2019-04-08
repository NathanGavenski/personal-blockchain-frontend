import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GeneralRegistryService } from '../../../../services/contracts/general/general-registry.service';
import { UserSerializableService } from '../../../../services/contracts/serialize/user/user-serializable.service';
import { AuthService } from '../../../../services/utils/auth-service.service';
import { General } from '../../../models/general';
import { User } from '../../../models/user';
import { SharedRG } from './shared.model';

@Component({
  selector: 'app-view-general',
  templateUrl: './view-general.component.html',
  styleUrls: ['./view-general.component.scss']
})
export class ViewGeneralComponent implements OnInit {

  @Input() hideButtons = false;
  @Output() documentTitleController: EventEmitter<any> = new EventEmitter();

  public date: Date;
  public status: boolean;
  public tokenId: string;
  public showModal = false;
  public user: User = new User('', '');
  public sharedDocuments: SharedRG[] = [];
  public document: General = new General('', '', '');

  constructor(
    private afAuth: AuthService,
    private userSerializableService: UserSerializableService,
    public generalService: GeneralRegistryService
  ) {
    userSerializableService.getGeneralRegistry()
      .then((response: General) => {
        if (response.creationDate) {
          this.document = response;
          this.date = new Date(0);
          this.date.setUTCSeconds(Number(response.creationDate));
          this.eventEmitter(true);
        } else {
          this.eventEmitter(false);
        }
      });

    userSerializableService.getUser()
      .then((response: User) => {
        this.user = response;
      });

    this.getStatus();
  }

  ngOnInit() {
    this.getSharedDocumentsIds()
      .then((response: string[]) => {
        const sharedIds = response;
        if (response) {
          sharedIds.map(element => {
            this.getSpecificDocument(element)
              .then((res: General) => {
                const sharedDoc: SharedRG = new SharedRG(res);
                this.getSpecificUser(element)
                  .then((user: User) => {
                    sharedDoc.setNames(user);
                    this.sharedDocuments.push(sharedDoc);
                  });
              });
          });
        }
      });
  }

  private eventEmitter(obj) {
    this.documentTitleController.emit({ show: obj });
  }

  public cancel() {
    this.showModal = false;
  }

  public async shareDocument() {
    this.showModal = true;
    const tokenUid = await this.afAuth.getLogingUser();
    this.tokenId = tokenUid.uid;
  }

  public async activate() {
    const tokenUid = await this.afAuth.getLogingUser();
    this.generalService.approve(tokenUid.uid)
      .then(() => {
        this.getStatus();
      });
  }

  public async deactivate() {
    const tokenUid = await this.afAuth.getLogingUser();
    this.generalService.negate(tokenUid.uid)
      .then(() => {
        this.getStatus();
      });
  }

  public transformDate(epochTime) {
    const date = new Date(0);
    date.setUTCSeconds(Number(epochTime));
    const day = (date.getDate() < 10) ? `0${date.getDate() + 1}` : date.getDate() + 1;
    const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    return `${day}/${month}/${date.getFullYear()}`;
  }

  private getStatus() {
    this.userSerializableService.getGeneralRegistryStatus()
      .then((status: boolean) => {
        this.status = status;
      });
  }

  private getSharedDocumentsIds() {
    return new Promise((resolve) => {
      this.userSerializableService.getSharedGeneralRegistry()
        .then((response: string[]) => {
          if (response.length > 0) {
            resolve(response);
          } else {
            resolve(undefined);
          }
        });
    });
  }

  private getSpecificDocument(id) {
    return new Promise((resolve) => {
      this.userSerializableService.getSpecificGeneralRegistry(id)
        .then((response: General) => {
          resolve(response);
        });
    });
  }

  private getSpecificUser(id) {
    return new Promise((resolve) => {
      this.userSerializableService.getSpecificUser(id)
        .then((response: User) => {
          resolve(response);
        });
    });
  }

}
