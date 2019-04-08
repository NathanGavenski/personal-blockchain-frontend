import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SerializableService } from 'src/app/services/contracts/serialize/serializable.service';
import { serializeMessage } from 'src/test-objects/Serialize';
import { ShareModalComponent } from './share-modal.component';

class MockDocumentService {
  share() {
  }
  getSharedDocument() {
    return Promise.resolve(serializeMessage);
  }
}

describe('ShareModalComponent', () => {
  let component: ShareModalComponent;
  let fixture: ComponentFixture<ShareModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShareModalComponent
      ],
      imports: [
        FormsModule,
        BrowserModule,
        ReactiveFormsModule
      ],
      providers: [
        SerializableService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a cancel event', () => {
    spyOn(component.dismissShareModal, 'emit');
    const compiled = fixture.nativeElement;
    const cancelButton = compiled.querySelector('#cancel');
    cancelButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.dismissShareModal.emit).toHaveBeenCalled();
  });

  it('should share a document and call cancel', fakeAsync(() => {
    component.document = 'senderId';
    component.recipientId = 'recipientId';
    component.documentService = new MockDocumentService();

    spyOn(component, 'cancel');
    spyOn(component.documentService, 'share')
      .and.returnValue(Promise.resolve());
    spyOn(component.documentService, 'getSharedDocument')
      .and.returnValue(Promise.resolve());
    spyOn(SerializableService.prototype, 'deserialize')
      .and.returnValue(['senderId']);

    const compiled = fixture.nativeElement;
    const shareButton = compiled.querySelector('#share');
    shareButton.dispatchEvent(new Event('click'));
    tick(3000);
    fixture.detectChanges();

    expect(component.cancel).toHaveBeenCalled();
    expect(compiled.querySelector('error-message')).toBeFalsy();
    expect(compiled.querySelector('.successful-message').innerHTML).toBeTruthy();
    expect(compiled.querySelector('.successful-message').innerHTML).toContain('Documento compartilhado!');
  }));

  it('should not share a document and call setErrorMessage', fakeAsync(() => {
    component.document = 'senderId';
    component.recipientId = 'recipientId';
    component.documentService = new MockDocumentService();

    spyOn(component.documentService, 'share')
      .and.returnValue(Promise.resolve());
    spyOn(component.documentService, 'getSharedDocument')
      .and.returnValue(Promise.resolve());
    spyOn(SerializableService.prototype, 'deserialize')
      .and.returnValue(['notSenderId']);

    const compiled = fixture.nativeElement;
    const shareButton = compiled.querySelector('#share');
    shareButton.dispatchEvent(new Event('click'));
    tick(5);
    fixture.detectChanges();


    expect(compiled.querySelector('.error-message')).toBeTruthy();
    expect(compiled.querySelector('.successful-message')).toBeFalsy();
    expect(compiled.querySelector('.error-message').innerHTML).toContain('Algo deu errado');

    tick(6000);
    fixture.detectChanges();
    expect(compiled.querySelector('.error-message')).toBeFalsy();
  }));

  it('should not share a document for undefined recipient', fakeAsync(() => {
    component.document = 'senderId';
    component.recipientId = undefined;
    component.documentService = new MockDocumentService();

    const compiled = fixture.nativeElement;
    const shareButton = compiled.querySelector('#share');
    shareButton.dispatchEvent(new Event('click'));
    tick(5);
    fixture.detectChanges();

    expect(compiled.querySelector('.error-message')).toBeTruthy();
    expect(compiled.querySelector('.successful-message')).toBeFalsy();
    expect(compiled.querySelector('.error-message').innerHTML).toContain('Favor preencher ID');

    tick(6000);
    fixture.detectChanges();
    expect(compiled.querySelector('.error-message')).toBeFalsy();
  }));
});
