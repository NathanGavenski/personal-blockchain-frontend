import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { NotificationContract } from 'src/test-objects/contracts/NotificationContract';
import { FireUser } from 'src/test-objects/Users';
import { MockWeb3, transactionObject } from 'src/test-objects/Web3';
import { NotificationService } from './notification.service';


describe('NotificationService', () => {

  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationService]
    });
  });

  beforeEach(inject([NotificationService], (ser: NotificationService) => {
    service = ser;

    service._notificationContract = NotificationContract;
    spyOn(service, 'getAccount')
      .and.returnValue(Promise.resolve());
  }));

  it('should be created', inject([NotificationService], (service: NotificationService) => {
    expect(service).toBeTruthy();
  }));

  it('should call sendMessage with transactionObject', fakeAsync(() => {
    service._notificationContract.sendMessage = new MockWeb3();
    spyOn(service._notificationContract.sendMessage, 'sendTransaction');
    service.sendMessage(FireUser.uid, FireUser.uid, 'teste');
    tick();

    expect(service._notificationContract.sendMessage.sendTransaction)
      .toHaveBeenCalledWith(FireUser.uid, FireUser.uid, 'teste', transactionObject, jasmine.any(Function));
  }));

  it('should call getMessagesIds', fakeAsync(() => {
    service._notificationContract.getMessagesIds = new MockWeb3();
    spyOn(service._notificationContract.getMessagesIds, 'call');
    service.getMessagesIds(FireUser.uid);
    tick();

    expect(service._notificationContract.getMessagesIds.call).toHaveBeenCalled();
  }));

  it('should call getMessage', fakeAsync(() => {
    service._notificationContract.getMessages = new MockWeb3();
    spyOn(service._notificationContract.getMessages, 'call');
    service.getMessage(FireUser.uid, '1');
    tick();

    expect(service._notificationContract.getMessages.call).toHaveBeenCalled();
  }));

  it('should call isRead', fakeAsync(() => {
    service._notificationContract.isRead = new MockWeb3();
    spyOn(service._notificationContract.isRead, 'call');
    service.isRead(FireUser.uid, '1');
    tick();

    expect(service._notificationContract.isRead.call).toHaveBeenCalled();
  }));

  it('should call markRead with transactionObject', fakeAsync(() => {
    service._notificationContract.markRead = new MockWeb3();
    spyOn(service._notificationContract.markRead, 'sendTransaction');
    service.markRead(FireUser.uid, '1');
    tick();

    expect(service._notificationContract.markRead.sendTransaction)
      .toHaveBeenCalledWith(FireUser.uid, '1', transactionObject, jasmine.any(Function));
  }));

  it('should call isDeleted', fakeAsync(() => {
    service._notificationContract.isDeleted = new MockWeb3();
    spyOn(service._notificationContract.isDeleted, 'call');
    service.isDeleted(FireUser.uid, '1');
    tick();

    expect(service._notificationContract.isDeleted.call).toHaveBeenCalled();
  }));

  it('should call markDeleted with transactionObject', fakeAsync(() => {
    service._notificationContract.markDeleted = new MockWeb3();
    spyOn(service._notificationContract.markDeleted, 'sendTransaction');
    service.markDeleted(FireUser.uid, '1');
    tick();

    expect(service._notificationContract.markDeleted.sendTransaction)
      .toHaveBeenCalledWith(FireUser.uid, '1', transactionObject, jasmine.any(Function));
  }));
});
