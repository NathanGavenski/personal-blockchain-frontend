import { inject, TestBed } from '@angular/core/testing';
import { FireUser } from 'src/test-objects/Users';
import { AuthService } from '../../../utils/auth-service.service';
import { BirthRegistryService } from '../../birth/birth-registry.service';
import { GeneralRegistryService } from '../../general/general-registry.service';
import { StandardRegistryService } from '../../standard/standard-registry.service';
import { SerializableService } from '../serializable.service';
import { UserSerializableService } from './user-serializable.service';


class MockAuthService {
  getLogingUser() {
    return Promise.resolve(FireUser);
  }
}

describe('UserSerializableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SerializableService,
        BirthRegistryService,
        GeneralRegistryService,
        StandardRegistryService,
        UserSerializableService,
        { provide: AuthService, useClass: MockAuthService }
      ]
    });
  });

  it('should be created', inject([UserSerializableService], (service: UserSerializableService) => {
    expect(service).toBeTruthy();
  }));
});
