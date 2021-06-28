import { IAdHousing } from './AdHousing.interface';

export class AdHousing implements IAdHousing {
  constructor(
    public id: string,
    public title: string,
    public link: string,
    public address: string,
    public city: string,
    public image: string
  ){}
}
