export class General {

  constructor(
    public fathersName: string,
    public mothersName: string,
    public nationality: string,
    public cpf?: string,
    public pis?: string,
    public marriedLicense?: string,
    public photo?: string,
    public creationDate?: string,
    public status?: boolean
  ) { }

  updateStatus(status) {
    this.status = status;
  }
}
