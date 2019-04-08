import { inject, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/services/utils/auth-service.service';
import { FireUser } from 'src/test-objects/Users';
import { SerializableService } from '../serializable.service';
import { NotificationSerializeService } from './notification-serialize.service';

class MockAuthService {
  getLogingUser() {
    return Promise.resolve(FireUser);
  }
}

describe('NotificationSerializeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SerializableService,
        NotificationSerializeService,
        { provide: AuthService, useClass: MockAuthService }
      ]
    });
  });

  it('should be created', inject([NotificationSerializeService], (service: NotificationSerializeService) => {
    expect(service).toBeTruthy();
  }));
});
