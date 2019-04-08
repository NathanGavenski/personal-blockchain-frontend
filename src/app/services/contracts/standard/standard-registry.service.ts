import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import { NotificationService } from '../notification/notification.service';

declare let require: any;
declare let window: any;

const tokenAbi = require('../../../../assets/contracts/StandardRegistry.json');

@Injectable()
export class StandardRegistryService {

  public _web3: any;
  private _account: any;
  public _standardRegistryContract: any;

  constructor(
    private notification: NotificationService
  ) {
    if (typeof window.web3 !== 'undefined') {
      this._web3 = window.web3.currentProvider;
    } else {
      this._web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }
    this._standardRegistryContract = this._web3.eth.contract(tokenAbi).at('0xf12b5dd4ead5f743c6baa640b0216200e89b60da');
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


  public async lookUp(user) {
    const account = await this.getAccount();
    return new Promise((resolve, reject) => {
      this._standardRegistryContract.lookUpregistry.call(user.name, user.lastName,
        user.birthday, user.city, user.state, { from: account },
        function (err, res) {
          if (err != null) {
            reject(err);
          } else {
            resolve(res);
          }
        });
    });
  }

  public async createStandardRegestry(firebaseId, user) {
    const account = await this.getAccount();
    const transactionObject = {
      from: account,
      gas: 6721975,
      gasPrice: 0
    };

    return new Promise((resolve, reject) => {
      this._standardRegistryContract.createStandardregistry
        .sendTransaction(firebaseId, user.name, user.lastName,
          user.telephone, user.birthday, user.address,
          user.addressNumber, user.city, user.state,
          String(user.zip), user.mail, transactionObject,
          (err, res) => {
            if (err != null) {
              console.log(`Erro: ${err}`);
              reject(err);
            } else {
              this.notification.sendMessage(firebaseId, 'system', 'STANDARD_CREATE_SUCCESS');
              resolve(res);
            }
          });
    });
  }

  public async lookUpId(id) {
    const account = await this.getAccount();
    return new Promise((resolve, reject) => {
      this._standardRegistryContract.lookUpId
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

  public async update(firebaseId, birthDate, user) {
    const account = await this.getAccount();
    const transactionObject = {
      from: account,
      gas: 6721975,
      gasPrice: 0
    };

    return new Promise((resolve, reject) => {
      this._standardRegistryContract.update
        .sendTransaction(firebaseId, user.name, user.familyName, user.phone, birthDate,
          user.add, user.add_comp, user.city, user.state, user.zip, user.mail, transactionObject,
          (err, res) => {
            if (err != null) {
              console.log(`Erro: ${err}`);
            } else {
              this.notification.sendMessage(firebaseId, 'system', 'STANDARD_UPDATE_SUCESS');
              resolve(res);
            }
          });
    });
  }

}

