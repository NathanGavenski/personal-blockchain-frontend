import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { BirthRegistryService } from './birth-registry.service';
import { SerializableService } from '../serialize/serializable.service';
import { BirthContract } from 'src/test-objects/contracts/BirthContract';
import { MockWeb3, transactionObject } from 'src/test-objects/Web3';
import { BirthDoc, SonBirthDoc } from 'src/test-objects/Documents';
import { FireUser } from 'src/test-objects/Users';

describe('BirthRegistryService', () => {

  let service: BirthRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BirthRegistryService,
        SerializableService
      ]
    });
  });

  beforeEach(inject([BirthRegistryService], (ser: BirthRegistryService) => {
    service = ser;

    service._birthRegistryContract = BirthContract;
    spyOn(service, 'getAccount')
      .and.returnValue(Promise.resolve());
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call create with transactionObject', fakeAsync(() => {
    service._birthRegistryContract.createBirthCertificate = new MockWeb3();
    service._birthRegistryContract.updateGrandparents = new MockWeb3();

    spyOn(service._birthRegistryContract.createBirthCertificate, 'sendTransaction');
    spyOn(service._birthRegistryContract.updateGrandparents, 'sendTransaction');

    service.create(FireUser.uid, '04/12/2018', BirthDoc);
    tick();

    expect(service._birthRegistryContract.createBirthCertificate.sendTransaction)
      .toHaveBeenCalledWith(FireUser.uid, '04/12/2018', BirthDoc.cpf, BirthDoc.birthDate,
        BirthDoc.hospitalName, BirthDoc.cityOfBirth, BirthDoc.fathersName,
        BirthDoc.mothersName, transactionObject, jasmine.any(Function));
  }));

  it('should call createSon with transactionObject', fakeAsync(() => {
    service._birthRegistryContract.createSonsBirthCertificate = new MockWeb3();
    service._birthRegistryContract.updateSonsGrandparentsAndName = new MockWeb3();

    spyOn(service._birthRegistryContract.createSonsBirthCertificate, 'sendTransaction');
    spyOn(service._birthRegistryContract.updateSonsGrandparentsAndName, 'sendTransaction');

    service.createSon(FireUser.uid, '04/12/2018', SonBirthDoc);
    tick();

    expect(service._birthRegistryContract.createSonsBirthCertificate.sendTransaction)
      .toHaveBeenCalledWith(FireUser.uid, '04/12/2018', SonBirthDoc.cpf, SonBirthDoc.birthDate,
        SonBirthDoc.hospitalName, SonBirthDoc.cityOfBirth, SonBirthDoc.fathersName,
        SonBirthDoc.mothersName, transactionObject, jasmine.any(Function));
  }));

  it('should call setStandardAddress with transactionObject', fakeAsync(() => {
    service._birthRegistryContract.setStandardAddress = new MockWeb3();
    spyOn(service._birthRegistryContract.setStandardAddress, 'sendTransaction');

    service.setStandardAddress('teste');
    tick();

    expect(service._birthRegistryContract.setStandardAddress.sendTransaction)
      .toHaveBeenCalledWith('teste', transactionObject, jasmine.any(Function));
  }));

  it('should call isApproved', fakeAsync(() => {
    service._birthRegistryContract.isApproved = new MockWeb3();
    spyOn(service._birthRegistryContract.isApproved, 'call');

    service.isApproved('teste');
    tick();

    expect(service._birthRegistryContract.isApproved.call).toHaveBeenCalled();
  }));

  it('should call lookUpId', fakeAsync(() => {
    service._birthRegistryContract.lookUpId = new MockWeb3();
    spyOn(service._birthRegistryContract.lookUpId, 'call');

    service.lookUpId('teste');
    tick();

    expect(service._birthRegistryContract.lookUpId.call).toHaveBeenCalled();
  }));

  it('should call lookUpSonId', fakeAsync(() => {
    service._birthRegistryContract.lookUpSonsId = new MockWeb3();
    spyOn(service._birthRegistryContract.lookUpSonsId, 'call');

    service.lookUpSonsId('teste');
    tick();

    expect(service._birthRegistryContract.lookUpSonsId.call).toHaveBeenCalled();
  }));

  it('should call negate with transactionObject', fakeAsync(() => {
    service._birthRegistryContract.negate = new MockWeb3();
    spyOn(service._birthRegistryContract.negate, 'sendTransaction');

    service.negate('teste');
    tick();

    expect(service._birthRegistryContract.negate.sendTransaction)
      .toHaveBeenCalledWith('teste', transactionObject, jasmine.any(Function));
  }));

  it('should call approve with transactionObject', fakeAsync(() => {
    service._birthRegistryContract.approve = new MockWeb3();
    spyOn(service._birthRegistryContract.approve, 'sendTransaction');

    service.approve('teste');
    tick();

    expect(service._birthRegistryContract.approve.sendTransaction)
      .toHaveBeenCalledWith('teste', transactionObject, jasmine.any(Function));
  }));

  it('should call share with transactionObject', fakeAsync(() => {
    service._birthRegistryContract.shareDocument = new MockWeb3();
    spyOn(service._birthRegistryContract.shareDocument, 'sendTransaction');

    service.share(FireUser.uid, FireUser.uid);
    tick();

    expect(service._birthRegistryContract.shareDocument.sendTransaction)
      .toHaveBeenCalledWith(FireUser.uid, FireUser.uid, transactionObject, jasmine.any(Function));
  }));

  it('should call getSharedDocument', fakeAsync(() => {
    service._birthRegistryContract.getSharedDocument = new MockWeb3();
    spyOn(service._birthRegistryContract.getSharedDocument, 'call');

    service.getSharedDocument('teste');
    tick();

    expect(service._birthRegistryContract.getSharedDocument.call).toHaveBeenCalled();
  }));

  it('should call update with transactionObject', fakeAsync(() => {
    service._birthRegistryContract.updateBirthCertificate = new MockWeb3();
    spyOn(service._birthRegistryContract.updateBirthCertificate, 'sendTransaction');

    service.update(FireUser.uid, '04/12/2018', BirthDoc);
    tick();

    expect(service._birthRegistryContract.updateBirthCertificate.sendTransaction)
      .toHaveBeenCalledWith(FireUser.uid, '04/12/2018', BirthDoc.cpf, BirthDoc.birthDate,
        BirthDoc.hospitalName, BirthDoc.cityOfBirth, BirthDoc.fathersName,
        BirthDoc.mothersName, transactionObject, jasmine.any(Function));
  }));

  it('should call updateAdditionalInfo with transactionObject', fakeAsync(() => {
    service._birthRegistryContract.updateGrandparents = new MockWeb3();
    spyOn(service._birthRegistryContract.updateGrandparents, 'sendTransaction');

    service.updateAdditionalInfo(FireUser.uid, BirthDoc);
    tick();

    expect(service._birthRegistryContract.updateGrandparents.sendTransaction)
      .toHaveBeenCalledWith(FireUser.uid, BirthDoc.fathersGrandmothersName,
        BirthDoc.fathersGrandfathersName, BirthDoc.mothersGrandmothersName,
        BirthDoc.mothersGrandfathersName, transactionObject, jasmine.any(Function));
  }));

});
