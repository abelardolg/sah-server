import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { GetAdsHousingUseCase } from '../Domain/useCases/getAdsHousing.usecase';

import { ValidPage } from '../Domain/pipes/ValidPage.pipe';

@Controller()
export class GetAdsHousingController {
  constructor(private readonly getAdsHousingUseCase: GetAdsHousingUseCase){}

  @Get(':fromPage')
  async getAdsHousing(@Param('fromPage', ValidPage) fromPage: number) {
    return await this.getAdsHousingUseCase.getAdsHousing(fromPage);
  }

  @Get()
  async getAllAdsHousing() {
    return await this.getAdsHousingUseCase.getAllAdsHousing();
  }
}

