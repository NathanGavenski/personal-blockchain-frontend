import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { StandardContract } from 'src/test-objects/contracts/StandardContract';
import { FireUser, UserModel } from 'src/test-objects/Users';
import { MockWeb3 } from 'src/test-objects/Web3';
import { NotificationService } from '../notification/notification.service';
import { StandardRegistryService } from './standard-registry.service';



describe('StandardRegistryService', () => {

  let service: StandardRegistryService;
  let notification: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StandardRegistryService,
        NotificationService
      ]
    });
  });

  beforeEach(inject([StandardRegistryService, NotificationService], (ser: StandardRegistryService, not: NotificationService) => {
    service = ser;
    notification = not;

    service._standardRegistryContract = StandardContract;
    spyOn(service, 'getAccount')
      .and.returnValue(Promise.resolve());
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call lookUp', fakeAsync(() => {
    service._standardRegistryContract.lookUpregistry = new MockWeb3();
    spyOn(service._standardRegistryContract.lookUpregistry, 'call');
    service.lookUp(UserModel);
    tick();

    expect(service._standardRegistryContract.lookUpregistry.call).toHaveBeenCalled();
  }));

  it('should call createStandardRegistry', fakeAsync(() => {
    service._standardRegistryContract.createStandardregistry = new MockWeb3();
    spyOn(service._standardRegistryContract.createStandardregistry, 'sendTransaction');
    service.createStandardRegestry(FireUser.uid, UserModel);
    tick();

    expect(service._standardRegistryContract.createStandardregistry.sendTransaction).toHaveBeenCalled();
  }));

  it('should call lookUpId', fakeAsync(() => {
    service._standardRegistryContract.lookUpId = new MockWeb3();
    spyOn(service._standardRegistryContract.lookUpId, 'call');
    service.lookUpId(FireUser.uid);
    tick();

    expect(service._standardRegistryContract.lookUpId.call).toHaveBeenCalled();
  }));

  it('should call update', fakeAsync(() => {
    service._standardRegistryContract.update = new MockWeb3();
    spyOn(service._standardRegistryContract.update, 'sendTransaction');
    service.update(FireUser.uid, '24/02/1993', UserModel);
    tick();

    expect(service._standardRegistryContract.update.sendTransaction).toHaveBeenCalled();
  }));
});
