import { Controller, Get } from '@nestjs/common';

import { GetAdsHousingUseCase } from '../Domain/useCases/getAdsHousing.usecase';

@Controller()
export class GetAdsHousingController {
  constructor(private readonly getAdsHousingUseCase: GetAdsHousingUseCase){}

  @Get()
  async getAdsHousing() {
    return await this.getAdsHousingUseCase.getAdsHousing();
  }
}

