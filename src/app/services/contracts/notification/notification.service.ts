import { Injectable } from '@angular/core';
import * as Web3 from 'web3';

declare let require: any;
declare let window: any;

const tokenAbi = require('../../../../assets/contracts/Notification.json');

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public _notificationContract: any;
  private _web3: any;
  private _account: any;
  public alreadyHave: boolean;

  constructor() {
    if (typeof window.web3 !== 'undefined') {
      this._web3 = window.web3.currentProvider;
    } else {
      this._web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }

    this._notificationContract = this._web3.eth.contract(tokenAbi).at('0x2c2b9c9a4a25e24b174f26114e8926a9f2128fe4');
  }

  public async getAccount(): Promise<string> {
    if (this._account == null) {
      this._account = await new Promise((resolve, reject) => {
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

  public async sendMessage(recipientId, senderId, message) {
    const account = await this.getAccount();
    const transactionObject = {
      from: account,
      gas: 6721975,
      gasPrice: 0
    };

    return new Promise((resolve, reject) => {
      this._notificationContract.sendMessage
        .sendTransaction(recipientId, senderId, message, transactionObject,
          (err, res) => {
            if (err !== null) {
              console.log(`Erro: ${err}`);
              reject(err);
            } else {
              resolve(res);
            }
          });
    });
  }

  public async getMessagesIds(firebaseId) {
    const account = await this.getAccount();
    return new Promise((resolve, reject) => {
      this._notificationContract.getMessagesIds
        .call(firebaseId, { from: account },
          (err, res) => {
            if (err != null) {
              console.log(`Erro: ${err}`);
              reject(err);
            } else {
              resolve(res);
            }
          });
    });
  }

  public async getMessage(firebaseId, messageId) {
    const account = await this.getAccount();
    return new Promise((resolve, reject) => {
      this._notificationContract.getMessages
        .call(firebaseId, messageId, { from: account },
          (err, res) => {
            if (err != null) {
              console.log(`Erro: ${err}`);
              reject(err);
            } else {
              resolve(res);
            }
          });
    });
  }

  public async isRead(firebaseId, messageId) {
    const account = await this.getAccount();
    return new Promise((resolve, reject) => {
      this._notificationContract.isRead
        .call(firebaseId, messageId, { from: account },
          (err, res) => {
            if (err != null) {
              console.log(`Erro: ${err}`);
              reject(err);
            } else {
              resolve(res);
            }
          });
    });
  }

  public async markRead(firebaseId, messageId) {
    const account = await this.getAccount();
    const transactionObject = {
      from: account,
      gas: 6721975,
      gasPrice: 0
    };

    return new Promise((resolve, reject) => {
      this._notificationContract.markRead
        .sendTransaction(firebaseId, messageId, transactionObject,
          (err, res) => {
            if (err !== null) {
              console.log(`Erro: ${err}`);
              reject(err);
            } else {
              resolve(res);
            }
          });
    });
  }

  public async isDeleted(firebaseId, messageId) {
    const account = await this.getAccount();
    return new Promise((resolve, reject) => {
      this._notificationContract.isDeleted
        .call(firebaseId, messageId, { from: account },
          (err, res) => {
            if (err != null) {
              console.log(`Erro: ${err}`);
              reject(err);
            } else {
              resolve(res);
            }
          });
    });
  }

  public async markDeleted(firebaseId, messageId) {
    const account = await this.getAccount();
    const transactionObject = {
      from: account,
      gas: 6721975,
      gasPrice: 0
    };

    return new Promise((resolve, reject) => {
      this._notificationContract.markDeleted
        .sendTransaction(firebaseId, messageId, transactionObject,
          (err, res) => {
            if (err !== null) {
              console.log(`Erro: ${err}`);
              reject(err);
            } else {
              resolve(res);
            }
          });
    });
  }
}
