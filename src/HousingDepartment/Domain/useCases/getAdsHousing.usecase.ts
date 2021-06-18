import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap, toArray } from 'rxjs/operators';

import { GetAdsHousingService } from '../services/getAdsHousing.service';

import { AdHousing } from '../models/AdHousing.class';

import { DomainError } from '../exceptions/DomainError.exception';

@Injectable()
export class GetAdsHousingUseCase {

  constructor(private getAdsHousingService: GetAdsHousingService,
              private configService: ConfigService){
    this.getAdsHousingService = getAdsHousingService;
    this.configService = configService;
  }

  async getAdsHousing(fromPage: number): Promise<Observable<AdHousing[]>> {
    try {
      const response = await this.getAdsHousingService.getAdsHousing();

      return response
        .pipe(
          mergeMap(response => response.data.slice(fromPage, fromPage + this.getResultsPerPage())),
          map(({ Link, City, Address, Images }) =>
            new AdHousing(Address, Link, Address, City, Images[0])
          ),
          toArray(),
        );
    } catch(error) {
      throw new DomainError(error);
    }

  }

  async getAllAdsHousing(): Promise<Observable<AdHousing[]>> {
    // try {
      const response = await this.getAdsHousingService.getAdsHousing();

      return response
        .pipe(
          catchError( (error:any) => {
            return throwError(new DomainError(error));
          }),
          mergeMap(response => response.data),
          map(({ Link, City, Address, Images }) =>
            new AdHousing(Address, Link, Address, City, Images[0])
          ),
          toArray(),

        );

  }

  getResultsPerPage(): number {
    return parseInt(this.configService.get<string>('data.resultsPerPage'));
  }

}
