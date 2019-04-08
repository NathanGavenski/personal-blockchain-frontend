import { Injectable } from '@angular/core';
import { Birth, SonsBirthCertificate } from 'src/app/components/models/birth';
import { General } from '../../../../components/models/general';
import { User } from '../../../../components/models/user';
import { AuthService } from '../../../utils/auth-service.service';
import { BirthRegistryService } from '../../birth/birth-registry.service';
import { GeneralRegistryService } from '../../general/general-registry.service';
import { StandardRegistryService } from '../../standard/standard-registry.service';
import { SerializableService } from '../serializable.service';

@Injectable()
export class UserSerializableService {

  constructor(
    private afAuth: AuthService,
    private serialize: SerializableService,
    private standardContract: StandardRegistryService,
    private generalContract: GeneralRegistryService,
    private birthContract: BirthRegistryService
  ) { }

  async getUser() {
    const tokenUid = await this.afAuth.getLogingUser();
    return new Promise((resolve, reject) => {
      this.standardContract.lookUpId(tokenUid.uid)
        .then(hexUser => {
          const userArray = this.serialize.deserialize(hexUser);
          resolve(new User(userArray[9], '', userArray[0], userArray[1], userArray[2], userArray[3], '', '', userArray[4],
            userArray[5], userArray[6], userArray[7], userArray[8], ''));
        }).catch(err => {
          reject(err);
        });
    });
  }

  async getSpecificUser(tokenUid) {
    return new Promise((resolve, reject) => {
      this.standardContract.lookUpId(tokenUid)
        .then(hexUser => {
          const userArray = this.serialize.deserialize(hexUser);
          resolve(new User(userArray[9], '', userArray[0], userArray[1], userArray[2], userArray[3], '', '', userArray[4],
            userArray[5], userArray[6], userArray[7], userArray[8], ''));
        }).catch(err => {
          reject(err);
        });
    });
  }

  async getGeneralRegistry() {
    const tokenUid = await this.afAuth.getLogingUser();
    return new Promise((resolve, reject) => {
      this.generalContract.lookUpId(tokenUid.uid)
        .then(hexDocument => {
          const documentArray = this.serialize.deserialize(hexDocument);
          resolve(new General(documentArray[0], documentArray[1], documentArray[6], documentArray[3], documentArray[4],
            documentArray[7], documentArray[5], documentArray[2]));
        }).catch(err => {
          reject(err);
        });
    });
  }

  async getSpecificGeneralRegistry(tokenUid) {
    return new Promise((resolve, reject) => {
      this.generalContract.lookUpId(tokenUid)
        .then(hexDocument => {
          const documentArray = this.serialize.deserialize(hexDocument);
          resolve(new General(documentArray[0], documentArray[1], documentArray[6], documentArray[3], documentArray[4],
            documentArray[7], documentArray[5], documentArray[2]));
        }).catch(err => {
          reject(err);
        });
    });
  }

  async getGeneralRegistryStatus() {
    const tokenUid = await this.afAuth.getLogingUser();
    return new Promise((resolve, reject) => {
      this.generalContract.isApproved(tokenUid.uid)
        .then(response => {
          resolve(response);
        }).catch(err => {
          reject(err);
        });
    });
  }

  async getSharedGeneralRegistry() {
    const tokenUid = await this.afAuth.getLogingUser();
    return new Promise((resolve, reject) => {
      this.generalContract.getSharedDocument(tokenUid.uid)
        .then(response => {
          resolve(this.serialize.deserialize(response));
        }).catch(err => {
          reject(err);
        });
    });
  }

  async getBirthRegistry() {
    const tokenUid = await this.afAuth.getLogingUser();
    return new Promise((resolve) => {
      this.birthContract.lookUpId(tokenUid.uid)
        .then(hexDocument => {
          const documentArray = this.serialize.deserialize(hexDocument);
          const birth = new Birth(documentArray[1], documentArray[2], documentArray[3], documentArray[4], documentArray[5],
            documentArray[6], documentArray[7], documentArray[8], documentArray[9], documentArray[10]);
          if (documentArray.length > 11) {
            for (let i = 11; i < documentArray.length; i++) {
              birth.addSonId(documentArray[i]);
            }
          }
          resolve(birth);
        });
    });
  }

  async getSpecificBirthRegistry(tokenUid) {
    return new Promise((resolve, reject) => {
      this.birthContract.lookUpId(tokenUid)
        .then(hexDocument => {
          const documentArray = this.serialize.deserialize(hexDocument);
          const birth = new Birth(documentArray[1], documentArray[2], documentArray[3], documentArray[4], documentArray[5],
            documentArray[6], documentArray[7], documentArray[8], documentArray[9], documentArray[10]);
          if (documentArray.length > 11) {
            for (let i = 11; i < documentArray.length; i++) {
              birth.addSonId(documentArray[i]);
            }
          }
          resolve(birth);
        });
    });
  }

  async getBirthRegistryStatus() {
    const tokenUid = await this.afAuth.getLogingUser();
    return new Promise((resolve, reject) => {
      this.birthContract.isApproved(tokenUid.uid)
        .then(response => {
          resolve(response);
        }).catch(err => {
          reject(err);
        });
    });
  }

  async getSonsBirthRegistry(sonId: Number) {
    return new Promise((resolve, reject) => {
      this.birthContract.lookUpSonsId(sonId)
        .then(hexDocument => {
          const documentArray = this.serialize.deserialize(hexDocument);
          resolve(new SonsBirthCertificate(documentArray[1], documentArray[12], documentArray[11], documentArray[2],
            documentArray[3], documentArray[4], documentArray[5], documentArray[6], documentArray[7], documentArray[8],
            documentArray[9], documentArray[10]));
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getSharedBirthRegistry() {
    const tokenUid = await this.afAuth.getLogingUser();
    return new Promise((resolve, reject) => {
      this.birthContract.getSharedDocument(tokenUid.uid)
        .then(response => {
          resolve(this.serialize.deserialize(response));
        }).catch(err => {
          reject(err);
        });
    });
  }
}
