import { Controller, Get, HttpStatus, Param, ParseIntPipe, Res, UseGuards } from '@nestjs/common';

import { GetAdsHousingUseCase } from '../Domain/useCases/getAdsHousing.usecase';

import { ValidPage } from '../Domain/pipes/ValidPage.pipe';

@Controller()
export class GetAdsHousingController {
  constructor(private readonly getAdsHousingUseCase: GetAdsHousingUseCase){}

  @Get("getAllAdsHousing")
  async getAllAdsHousing() {
    return await this.getAdsHousingUseCase.getAllAdsHousing();
  }

  @Get(':fromPage')
  async getAdsHousing(@Param('fromPage', ValidPage) fromPage: number) {
    return await this.getAdsHousingUseCase.getAdsHousing(fromPage);
  }
}

