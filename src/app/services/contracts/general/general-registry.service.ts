import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import { General } from 'src/app/components/models/general';
import { NotificationService } from '../notification/notification.service';

declare let require: any;
declare let window: any;

const tokenAbi = require('../../../../assets/contracts/GeneralRegistry.json');

@Injectable()
export class GeneralRegistryService {

  public _generalRegistryContract: any;
  private _web3: any;
  private _account: any;
  public alreadyHave: boolean;

  constructor(
    private notification: NotificationService
  ) {
    if (typeof window.web3 !== 'undefined') {
      this._web3 = window.web3.currentProvider;
    } else {
      this._web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }

    this._generalRegistryContract = this._web3.eth.contract(tokenAbi).at('0x345ca3e014aaf5dca488057592ee47305d9b3e10');
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

  public async createGeneralRegestry(firebaseId, creationDate, user: General) {
    const account = await this.getAccount();
    const transactionObject = {
      from: account,
      gas: 6721975,
      gasPrice: 0
    };

    if (!user.marriedLicense) {
      return await this.createSingleGeneralRegistry(firebaseId, creationDate, user, transactionObject);
    } else {
      return await this.createMarriedGeneralRegistry(firebaseId, creationDate, user, transactionObject);
    }
  }

  public createSingleGeneralRegistry(firebaseId, creationDate, user: General, transactionObject) {
    return new Promise((resolve, reject) => {
      this._generalRegistryContract.createSingleGeneralRegistry
        .sendTransaction(firebaseId, user.fathersName, user.mothersName, creationDate,
          user.cpf, user.pis, 'userPhoto', user.nationality, transactionObject,
          (err, res) => {
            if (err != null) {
              console.log(`Erro: ${err}`);
              this.notification.sendMessage(firebaseId, 'system', 'GENERAL_CREATE_FAILURE');
              reject(err);
            } else {
              this.notification.sendMessage(firebaseId, 'system', 'GENERAL_CREATE_SUCCESS');
              resolve(res);
            }
          });
    });
  }

  public createMarriedGeneralRegistry(firebaseId, creationDate, user: General, transactionObject) {
    return new Promise((resolve, reject) => {
      this._generalRegistryContract.createMarriedGeneralRegistry
        .sendTransaction(firebaseId, user.fathersName, user.mothersName, creationDate,
          user.cpf, user.pis, 'userPhoto', user.nationality, user.marriedLicense, transactionObject,
          (err, res) => {
            if (err != null) {
              console.log(`Erro: ${err}`);
              this.notification.sendMessage(firebaseId, 'system', 'GENERAL_CREATE_FAILURE');
              reject(err);
            } else {
              this.notification.sendMessage(firebaseId, 'system', 'GENERAL_CREATE_SUCCESS');
              resolve(res);
            }
          });
    });
  }

  public async update(firebaseId, creationDate, user: General) {
    const account = await this.getAccount();
    const transactionObject = {
      from: account,
      gas: 6721975,
      gasPrice: 0
    };

    const marriedLicense = (user.marriedLicense) ? user.marriedLicense : 'N/A';
    const photo = (user.photo) ? user.photo : 'N/A';

    return new Promise((resolve, reject) => {
      this._generalRegistryContract.update
        .sendTransaction(firebaseId, user.fathersName, user.mothersName, creationDate,
          user.cpf, user.pis, photo, user.nationality, marriedLicense, transactionObject,
          (err, res) => {
            if (err != null) {
              console.log(`Erro: ${err}`);
              reject(err);
            } else {
              this.notification.sendMessage(firebaseId, 'system', 'GENERAL_UPDATE');
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
      this._generalRegistryContract.shareDocument
        .sendTransaction(recipientFirebaseId, firebaseId, transactionObject,
          (err, res) => {
            if (err != null) {
              console.log(`Erro: ${err}`);
              reject(err);
            } else {
              this.notification.sendMessage(firebaseId, 'system', 'GENERAL_SHARE');
              resolve(res);
            }
          });
    });
  }

  public async getSharedDocument(firebaseId) {
    const account = await this.getAccount();
    return new Promise((resolve, reject) => {
      this._generalRegistryContract.getSharedDocument
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

  public async setStandardAddress(address) {
    const account = await this.getAccount();
    const transactionObject = {
      from: account,
      gas: 6721975,
      gasPrice: 0
    };

    return new Promise((resolve, reject) => {
      this._generalRegistryContract.setStandardAddress
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

  public async negate(id) {
    const account = await this.getAccount();
    const transactionObject = {
      from: account,
      gas: 6721975,
      gasPrice: 0
    };

    return new Promise((resolve, reject) => {
      this._generalRegistryContract.negate
        .sendTransaction(id, transactionObject,
          (err, res) => {
            if (err !== null) {
              console.log(`Erro: ${err}`);
              reject(err);
            } else {
              this.notification.sendMessage(id, 'system', 'GENERAL_NEGATE');
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
      this._generalRegistryContract.approve
        .sendTransaction(id, transactionObject,
          (err, res) => {
            if (err !== null) {
              console.log(`Erro: ${err}`);
              reject(err);
            } else {
              this.notification.sendMessage(id, 'system', 'GENERAL_APPROVE');
              resolve(res);
            }
          });
    });
  }

  public async lookUpId(id) {
    const account = await this.getAccount();
    return new Promise((resolve, reject) => {
      this._generalRegistryContract.lookUpId
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

  public async isApproved(id) {
    const account = await this.getAccount();
    return new Promise((resolve, reject) => {
      this._generalRegistryContract.isApproved
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

}

