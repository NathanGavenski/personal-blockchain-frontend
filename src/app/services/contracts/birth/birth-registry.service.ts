import { Injectable } from '@angular/core';
import { reject } from 'q';
import { Birth, SonsBirthCertificate } from 'src/app/components/models/birth';
import * as Web3 from 'web3';
import { SerializableService } from '../serialize/serializable.service';
import { NotificationService } from '../notification/notification.service';

declare let require: any;
declare let window: any;

const tokenAbi = require('../../../../assets/contracts/BirthRegistry.json');

@Injectable()
export class BirthRegistryService {

  public _birthRegistryContract: any;
  private _web3: any;
  private _account: any;
  public alreadyHave: boolean;

  constructor(
    private serialize: SerializableService,
    private notification: NotificationService
  ) {
    if (typeof window.web3 !== 'undefined') {
      this._web3 = window.web3.currentProvider;
    } else {
      this._web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }

    this._birthRegistryContract = this._web3.eth.contract(tokenAbi).at('0xf25186b5081ff5ce73482ad761db0eb0d25abfbf');
  }

  public async getAccount(): Promise<string> {
    if (this._account == null) {
      this._account = await new Promise((resolve) => {
        this._web3.eth.getAccounts((err, accs) => {
          if (err != null) {
            alert('There was an error fetching your accounts.');
            return;
          }

          if (accs.length === 0) {
            alert(`Couldn't get any accounts! Make sure your Ethereum client is configured correctly.`);
            return;
          }
          resolve(accs[0]);
        });
      }) as string;

      this._web3.eth.defaultAccount = this._account;
    }

    return Promise.resolve(this._account);
  }

  public async create(firebaseId, creationDate, birthRegistry: Birth) {
    const account = await this.getAccount();
    const transactionObject = {
      from: account,
      gas: 6721975,
      gasPrice: 0
    };

    if (birthRegistry.cpf) {
      birthRegistry.cpf = 'N/A';
    }

    return await this.createRegistry(firebaseId, creationDate, birthRegistry, transactionObject)
      .then(async () => {
        this.notification.sendMessage(firebaseId, 'system', 'BIRTH_CREATE_SUCCESS');
        return await this.insertGrandparentsNames(firebaseId, birthRegistry, transactionObject);
      })
      .catch((err) => {
        this.notification.sendMessage(firebaseId, 'system', 'BIRTH_CREATE_FAILURE');
        return reject(err);
      });
  }

  public async createSon(firebaseId, creationDate, birthRegistry: SonsBirthCertificate) {
    const account = await this.getAccount();
    const transactionObject = {
      from: account,
      gas: 6721975,
      gasPrice: 0
    };

    return await this.createSonRegistry(firebaseId, creationDate, birthRegistry, transactionObject)
      .then(async () => {
        return await this.lookUpId(firebaseId)
          .then(async (hex: string) => {
            this.notification.sendMessage(firebaseId, 'system', 'BIRTH_SON_CREATE_SUCCESS');
            const sonId = this.serialize.deserialize(hex)[11];
            return await this.insertSonGrandparentsNames(sonId, birthRegistry, transactionObject);
          });
      })
      .catch((err) => {
        this.notification.sendMessage(firebaseId, 'system', 'BIRTH_SON_CREATE_SUCCESS');
        return reject(err);
      });
  }

  public async setStandardAddress(address) {
    const account = await this.getAccount();
    const transactionObject = {
      from: account,
      gas: 6721975,
      gasPrice: 0
    };

    return new Promise((resolve, reject) => {
      this._birthRegistryContract.setStandardAddress
        .sendTransaction(address, transactionObject,
          function (err, res) {
            if (err !== null) {
              console.log(`Erro: ${err}`);
              reject(err);
            } else {
              resolve(res);
            }
          });
    });
  }

  public async isApproved(id) {
    const account = await this.getAccount();
    return new Promise((resolve, reject) => {
      this._birthRegistryContract.isApproved
        .call(id, { from: account }, function (err, res) {
          if (err != null) {
            console.log(`Erro: ${err}`);
            reject(err);
          } else {
            resolve(res);
          }
        });
    });
  }

  public async lookUpId(id) {
    const account = await this.getAccount();
    return new Promise((resolve, reject) => {
      this._birthRegistryContract.lookUpId
        .call(id, { from: account }, function (err, res) {
          if (err != null) {
            console.log(`Erro: ${err}`);
            reject(err);
          } else {
            resolve(res);
          }
        });
    });
  }

  public async lookUpSonsId(id) {
    const account = await this.getAccount();
    return new Promise((resolve, reject) => {
      this._birthRegistryContract.lookUpSonsId
        .call(id, { from: account }, function (err, res) {
          if (err != null) {
            console.log(`Erro: ${err}`);
            reject(err);
          } else {
            resolve(res);
          }
        });
    });
  }

  public async negate(id) {
    const account = await this.getAccount();
    const transactionObject = {
      from: account,
      gas: 6721975,
      gasPrice: 0
    };

    return new Promise((resolve, reject) => {
      this._birthRegistryContract.negate
        .sendTransaction(id, transactionObject,
          (err, res) => {
            if (err !== null) {
              console.log(`Erro: ${err}`);
              reject(err);
            } else {
              this.notification.sendMessage(id, 'system', 'BIRTH_NEGATE');
              resolve(res);
            }
          });
    });
  }

  public async approve(id) {
    const account = await this.getAccount();
    const transactionObject = {
      from: account,
      gas: 6721975,
      gasPrice: 0
    };

    return new Promise((resolve, reject) => {
      this._birthRegistryContract.approve
        .sendTransaction(id, transactionObject,
          (err, res) => {
            if (err !== null) {
              console.log(`Erro: ${err}`);
              reject(err);
            } else {
              this.notification.sendMessage(id, 'system', 'BIRTH_APPROVE');
              resolve(res);
            }
          });
    });
  }

  public async share(recipientFirebaseId, firebaseId) {
    const account = await this.getAccount();
    const transactionObject = {
      from: account,
      gas: 6721975,
      gasPrice: 0
    };

    return new Promise((resolve, reject) => {
      this._birthRegistryContract.shareDocument
        .sendTransaction(recipientFirebaseId, firebaseId, transactionObject,
          (err, res) => {
            if (err != null) {
              console.log(`Erro: ${err}`);
              reject(err);
            } else {
              this.notification.sendMessage(recipientFirebaseId, 'system', 'BIRTH_SHARE');
              resolve(res);
            }
          });
    });
  }

  public async getSharedDocument(firebaseId) {
    const account = await this.getAccount();
    return new Promise((resolve, reject) => {
      this._birthRegistryContract.getSharedDocument
        .call(firebaseId, { from: account },
          function (err, res) {
            if (err != null) {
              console.log(`Erro: ${err}`);
              reject(err);
            } else {
              resolve(res);
            }
          });
    });
  }

  public async update(firebaseId, creationDate, user: Birth) {
    const account = await this.getAccount();
    const transactionObject = {
      from: account,
      gas: 6721975,
      gasPrice: 0
    };

    return new Promise((resolve, reject) => {
      this._birthRegistryContract.updateBirthCertificate
        .sendTransaction(firebaseId, creationDate, user.cpf, user.birthDate, user.hospitalName,
          user.cityOfBirth, user.fathersName, user.mothersName, transactionObject,
          (err, res) => {
            if (err != null) {
              console.log(`Erro: ${err}`);
              this.notification.sendMessage(firebaseId, 'system', 'BIRTH_CREATE_FAILURE');
              reject(err);
            } else {
              this.notification.sendMessage(firebaseId, 'system', 'BIRTH_UPDATE_SUCCESS');
              resolve(res);
            }
          });
    });
  }

  public async updateAdditionalInfo(firebaseId, user: Birth) {
    const account = await this.getAccount();
    const transactionObject = {
      from: account,
      gas: 6721975,
      gasPrice: 0
    };

    this.insertGrandparentsNames(firebaseId, user, transactionObject)
      .then((res) => ({ res }));
  }

  private createRegistry(firebaseId, creationDate, birthRegistry: Birth, transactionObject) {
    return new Promise((resolve, reject) => {
      this._birthRegistryContract.createBirthCertificate
        .sendTransaction(firebaseId, creationDate, birthRegistry.cpf, birthRegistry.birthDate,
          birthRegistry.hospitalName, birthRegistry.cityOfBirth, birthRegistry.fathersName,
          birthRegistry.mothersName, transactionObject,
          function (err, res) {
            if (err != null) {
              console.log(`Erro: ${err}`);
              reject(err);
            } else {
              resolve(res);
            }
          });
    });
  }

  private insertGrandparentsNames(firebaseId, birthRegistry: Birth, transactionObject) {
    return new Promise((resolve, reject) => {
      this._birthRegistryContract.updateGrandparents
        .sendTransaction(firebaseId, birthRegistry.fathersGrandmothersName, birthRegistry.fathersGrandfathersName,
          birthRegistry.mothersGrandmothersName, birthRegistry.mothersGrandfathersName, transactionObject,
          function (err, res) {
            if (err != null) {
              console.log(`Erro: ${err}`);
              reject(err);
            } else {
              resolve(res);
            }
          });
    });
  }

  private createSonRegistry(firebaseId, creationDate, birthRegistry: SonsBirthCertificate, transactionObject) {
    return new Promise((resolve, reject) => {
      this._birthRegistryContract.createSonsBirthCertificate
        .sendTransaction(firebaseId, creationDate, birthRegistry.cpf, birthRegistry.birthDate,
          birthRegistry.hospitalName, birthRegistry.cityOfBirth, birthRegistry.fathersName,
          birthRegistry.mothersName, transactionObject,
          function (err, res) {
            if (err != null) {
              console.log(`Erro: ${err}`);
              reject(err);
            } else {
              resolve(res);
            }
          });
    });
  }

  private insertSonGrandparentsNames(firebaseId, birthRegistry: SonsBirthCertificate, transactionObject) {
    return new Promise((resolve, reject) => {
      this._birthRegistryContract.updateSonsGrandparentsAndName
        .sendTransaction(firebaseId, birthRegistry.fathersGrandmothersName, birthRegistry.fathersGrandfathersName,
          birthRegistry.mothersGrandmothersName, birthRegistry.mothersGrandfathersName, birthRegistry.name,
          birthRegistry.familyName, transactionObject,
          function (err, res) {
            if (err != null) {
              console.log(`Erro: ${err}`);
              reject(err);
            } else {
              resolve(res);
            }
          });
    });
  }
}
