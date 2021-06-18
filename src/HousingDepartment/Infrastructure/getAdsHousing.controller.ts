import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { GetAdsHousingUseCase } from '../Domain/useCases/getAdsHousing.usecase';

@Controller()
export class GetAdsHousingController {
  constructor(private readonly getAdsHousingUseCase: GetAdsHousingUseCase){}

  @Get(':fromPage')
  async getAdsHousing(@Param('fromPage', ParseIntPipe) fromPage: number) {
    return await this.getAdsHousingUseCase.getAdsHousing(fromPage);
  }

  @Get()
  async getAllAdsHousing() {
    return await this.getAdsHousingUseCase.getAllAdsHousing();
  }
}

