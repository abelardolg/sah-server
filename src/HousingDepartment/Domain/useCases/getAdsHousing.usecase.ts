import { Injectable } from '@nestjs/common';

import { Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap, take, tap, toArray } from 'rxjs/operators';

import { DomainError } from '../exceptions/DomainError.exception';

import { AdHousing } from '../models/AdHousing.class';
import { Respuesta } from '../models/Respuesta.class';

import { GetAdsHousingService } from '../services/getAdsHousing.service';


@Injectable()
export class GetAdsHousingUseCase {

  constructor(private getAdsHousingService: GetAdsHousingService){
    this.getAdsHousingService = getAdsHousingService;
  }

  async getAdsHousing(iniItem: number, itemCount: number = 0): Promise<Observable<Respuesta>> {
    let numAdsHousing: number;

    try {
      const response = await this.getData();

      return response
        .pipe(
          tap((response) => {
            numAdsHousing = response.data.length;
          }),
          mergeMap(response => response.data.slice(iniItem, iniItem+itemCount)),
          map(({ Link, City, Address, Images }) =>
              new AdHousing(Address, Link, Address, City, Images[0]),
          ),
          take(itemCount),
          toArray(),
          map((collection:any[]) =>
            new Respuesta(collection, numAdsHousing, (iniItem > 0), (iniItem+itemCount) < numAdsHousing),
          ),
        );
    } catch(error) {
      throw new DomainError(error);
    }

  }

  async getAllAdsHousing(): Promise<Observable<Respuesta>> {
    let numAdsHousing: number;

    const response = await this.getData();
    try {
      return response
        .pipe(
          catchError( (error:any) => {
            return throwError(new DomainError(error));
          }),
          tap((response) => {
            numAdsHousing = response.data.length;
          }),
          mergeMap(response => response.data),
          map(({ Link, City, Address, Images }) =>
            new AdHousing(Address, Link, Address, City, Images[0])
          ),
          toArray(),
          map((collection:any[]) =>
            new Respuesta(collection, numAdsHousing, true, true),
          ),
        );
    } catch(error) {
      throw new DomainError(error);
    }
  }

  private async getData() {
    return await this.getAdsHousingService.getAdsHousing();
  }

}
