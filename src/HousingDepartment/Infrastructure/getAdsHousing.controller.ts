import { Controller, Get, Query} from '@nestjs/common';

import { GetAdsHousingUseCase } from '../Domain/useCases/getAdsHousing.usecase';

import { ValidPage } from '../Domain/pipes/ValidPage.pipe';

@Controller()
export class GetAdsHousingController {
  constructor(private readonly getAdsHousingUseCase: GetAdsHousingUseCase){}

  @Get("getAllAdsHousing")
  async getAllAdsHousing() {
    return await this.getAdsHousingUseCase.getAllAdsHousing();
  }

  @Get('getSomeAdsHousing')
  async getAdsHousing(@Query('iniItem', ValidPage) iniItem: number,
                      @Query('itemCount', ValidPage) itemCount: number) {
    return await (await this.getAdsHousingUseCase.getAdsHousing(iniItem, itemCount)).toPromise();

  }
}
