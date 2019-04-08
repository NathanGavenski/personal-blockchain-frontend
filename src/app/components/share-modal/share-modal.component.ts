import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SerializableService } from 'src/app/services/contracts/serialize/serializable.service';

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.scss']
})
export class ShareModalComponent {

  @Input() document: string;
  @Input() documentService;
  @Output() dismissShareModal: EventEmitter<any> = new EventEmitter();

  public recipientId: string;
  public errorMessage: string;
  public successfulMessage: string;

  constructor(
    private serializableService: SerializableService
  ) { }

  public share() {
    if (this.document && this.recipientId) {
      this.documentService.share(this.recipientId, this.document)
        .then(() => {
          this.documentService.getSharedDocument(this.recipientId)
            .then(res => {
              const documents = this.serializableService.deserialize(res);
              if (documents.find(doc => doc === this.document ? doc : undefined)) {
                this.errorMessage = '';
                this.successfulMessage = 'Documento compartilhado!';
                setTimeout(() => {
                  this.cancel();
                }, 3000);
              } else {
                if (res) {
                  console.log(`Erro: ${res}`);
                }
                this.setErrorMessage('Algo deu errado');
              }
            });
        });
    } else {
      this.setErrorMessage('Favor preencher ID');
    }
  }

  public cancel() {
    this.dismissShareModal.emit();
  }

  private setErrorMessage(message) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 5000);
  }

}
