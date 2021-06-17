import { Dependencies, Injectable } from '@nestjs/common';

import { map, mergeMap, toArray } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GetAdsHousingService } from '../services/getAdsHousing.service';

import { AdHousing } from '../Models/AdHousing.class';

@Injectable()
@Dependencies(GetAdsHousingService)
export class GetAdsHousingUseCase {

  constructor(private getAdsHousingService: GetAdsHousingService){
    this.getAdsHousingService = getAdsHousingService;
  }

  async getAdsHousing(): Promise<Observable<AdHousing[]>> {
    const response = await this.getAdsHousingService.getAdsHousing();

    return response
      .pipe(
        mergeMap(response => response.data),
        map(({ Link, City, Address, Images }) =>
          new AdHousing(Address, Link, Address, City, Images[0])
        ),
        toArray(),
      );
  }

}
