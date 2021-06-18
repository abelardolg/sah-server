import { Dependencies, Injectable } from '@nestjs/common';

import { map, mergeMap, toArray } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GetAdsHousingService } from '../services/getAdsHousing.service';

import { AdHousing } from '../models/AdHousing.class';

import { DomainError } from '../exceptions/DomainError.exception';

@Injectable()
@Dependencies(GetAdsHousingService)
export class GetAdsHousingUseCase {

  constructor(private getAdsHousingService: GetAdsHousingService){
    this.getAdsHousingService = getAdsHousingService;
  }

  async getAdsHousing(): Promise<Observable<AdHousing[]>> {
    try {
      const response = await this.getAdsHousingService.getAdsHousing();

      return response
        .pipe(
          mergeMap(response => response.data.slice(0,10)),
          map(({ Link, City, Address, Images }) =>
            new AdHousing(Address, Link, Address, City, Images[0])
          ),
          toArray(),
        );
    } catch(error) {
      throw new DomainError(error);
    }

  }

}
