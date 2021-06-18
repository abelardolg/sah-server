import { AdHousing } from './AdHousing.class';

export class Respuesta {
  constructor(
    private data: AdHousing[],
    private nItems: number,
    private canPreviousPage: boolean,
    private canNextPage: boolean
  ){}
}
