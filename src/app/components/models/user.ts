export class User {

  constructor(
    public mail: string,
    public password: string,
    public name?: string,
    public lastName?: string,
    public telephone?: string,
    public birthday?: string,
    public martialStatus?: string,
    public sex?: string,
    public address?: string,
    public addressNumber?: string,
    public city?: string,
    public state?: string,
    public zip?: number,
    public nickname?: string
  ) { }
}
