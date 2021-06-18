import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';

import { GetAdsHousingUseCase } from '../Domain/useCases/getAdsHousing.usecase';

import { ValidPage } from '../Domain/pipes/ValidPage.pipe';
import { ValidationGuard } from '../Application/guards/validation.guard';

@Controller()
@UseGuards(ValidationGuard)
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

