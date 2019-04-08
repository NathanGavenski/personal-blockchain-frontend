import { TestBed, inject } from '@angular/core/testing';
import { deserializeMessage, serializeMessage } from 'src/test-objects/Serialize';
import { SerializableService } from './serializable.service';

describe('SerializableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SerializableService]
    });
  });

  it('should be created', inject([SerializableService], (service: SerializableService) => {
    expect(service).toBeTruthy();
  }));

  it('should deserialize a message', inject([SerializableService], (service: SerializableService) => {
    const result = service.deserialize(serializeMessage);
    expect(result.toString()).toBe(deserializeMessage.toString());
  }));

  it('should return empty', inject([SerializableService], (service: SerializableService) => {
    expect(service.deserialize('0x').toString()).toBe([].toString());
  }));
});
