import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { GeneralContract } from 'src/test-objects/contracts/GeneralContract';
import { GeneralDoc } from 'src/test-objects/Documents';
import { FireUser } from 'src/test-objects/Users';
import { MockWeb3, transactionObject } from 'src/test-objects/Web3';
import { GeneralRegistryService } from './general-registry.service';


describe('GeneralRegistryService', () => {

  let service: GeneralRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GeneralRegistryService
      ]
    });
  });

  beforeEach(inject([GeneralRegistryService], (ser: GeneralRegistryService) => {
    service = ser;

    service._generalRegistryContract = GeneralContract;
    spyOn(service, 'getAccount')
      .and.returnValue(Promise.resolve());
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call createSingleGeneralRegistry with transactionObject', fakeAsync(() => {
    service._generalRegistryContract.createSingleGeneralRegistry = new MockWeb3();
    spyOn(service._generalRegistryContract.createSingleGeneralRegistry, 'sendTransaction');
    service.createSingleGeneralRegistry(FireUser.uid, GeneralDoc.creationDate, GeneralDoc, transactionObject);
    tick();

    expect(service._generalRegistryContract.createSingleGeneralRegistry.sendTransaction)
      .toHaveBeenCalledWith(FireUser.uid, GeneralDoc.fathersName, GeneralDoc.mothersName,
        GeneralDoc.creationDate, GeneralDoc.cpf, GeneralDoc.pis, 'userPhoto',
        GeneralDoc.nationality, transactionObject, jasmine.any(Function));
  }));

  it('should call createMarriedGeneralRegistry with transactionObject', fakeAsync(() => {
    service._generalRegistryContract.createMarriedGeneralRegistry = new MockWeb3();
    spyOn(service._generalRegistryContract.createMarriedGeneralRegistry, 'sendTransaction');
    service.createMarriedGeneralRegistry(FireUser.uid, GeneralDoc.creationDate, GeneralDoc, transactionObject);
    tick();

    expect(service._generalRegistryContract.createMarriedGeneralRegistry.sendTransaction)
      .toHaveBeenCalledWith(FireUser.uid, GeneralDoc.fathersName, GeneralDoc.mothersName,
        GeneralDoc.creationDate, GeneralDoc.cpf, GeneralDoc.pis, 'userPhoto',
        GeneralDoc.nationality, GeneralDoc.marriedLicense, transactionObject, jasmine.any(Function));
  }));

  it('should call update with transactionObject', fakeAsync(() => {
    service._generalRegistryContract.update = new MockWeb3();
    spyOn(service._generalRegistryContract.update, 'sendTransaction');
    service.update(FireUser.uid, GeneralDoc.creationDate, GeneralDoc);
    tick();

    expect(service._generalRegistryContract.update.sendTransaction)
      .toHaveBeenCalledWith(FireUser.uid, GeneralDoc.fathersName, GeneralDoc.mothersName,
        GeneralDoc.creationDate, GeneralDoc.cpf, GeneralDoc.pis, 'userPhoto',
        GeneralDoc.nationality, GeneralDoc.marriedLicense, transactionObject, jasmine.any(Function));
  }));

  it('should call share with transactionObject', fakeAsync(() => {
    service._generalRegistryContract.shareDocument = new MockWeb3();
    spyOn(service._generalRegistryContract.shareDocument, 'sendTransaction');
    service.share(FireUser.uid, FireUser.uid);
    tick();

    expect(service._generalRegistryContract.shareDocument.sendTransaction)
      .toHaveBeenCalledWith(FireUser.uid, FireUser.uid, transactionObject, jasmine.any(Function));
  }));

  it('should call getSharedDocument', fakeAsync(() => {
    service._generalRegistryContract.getSharedDocument = new MockWeb3();
    spyOn(service._generalRegistryContract.getSharedDocument, 'call');
    service.getSharedDocument(FireUser.uid);
    tick();

    expect(service._generalRegistryContract.getSharedDocument.call).toHaveBeenCalled();
  }));

  it('should call setStandardAddress with transactionObject', fakeAsync(() => {
    service._generalRegistryContract.setStandardAddress = new MockWeb3();
    spyOn(service._generalRegistryContract.setStandardAddress, 'sendTransaction');
    service.setStandardAddress('teste');
    tick();

    expect(service._generalRegistryContract.setStandardAddress.sendTransaction)
      .toHaveBeenCalledWith('teste', transactionObject, jasmine.any(Function));
  }));

  it('should call negate with transactionObject', fakeAsync(() => {
    service._generalRegistryContract.negate = new MockWeb3();
    spyOn(service._generalRegistryContract.negate, 'sendTransaction');
    service.negate('teste');
    tick();

    expect(service._generalRegistryContract.negate.sendTransaction)
      .toHaveBeenCalledWith('teste', transactionObject, jasmine.any(Function));
  }));

  it('should call approve with transactionObject', fakeAsync(() => {
    service._generalRegistryContract.approve = new MockWeb3();
    spyOn(service._generalRegistryContract.approve, 'sendTransaction');
    service.approve('teste');
    tick();

    expect(service._generalRegistryContract.approve.sendTransaction)
      .toHaveBeenCalledWith('teste', transactionObject, jasmine.any(Function));
  }));

  it('should call lookUpId', fakeAsync(() => {
    service._generalRegistryContract.lookUpId = new MockWeb3();
    spyOn(service._generalRegistryContract.lookUpId, 'call');
    service.lookUpId(FireUser.uid);
    tick();

    expect(service._generalRegistryContract.lookUpId.call).toHaveBeenCalled();
  }));

  it('should call isApproved', fakeAsync(() => {
    service._generalRegistryContract.isApproved = new MockWeb3();
    spyOn(service._generalRegistryContract.isApproved, 'call');
    service.isApproved(FireUser.uid);
    tick();

    expect(service._generalRegistryContract.isApproved.call).toHaveBeenCalled();
  }));
});
