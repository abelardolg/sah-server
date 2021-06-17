import { ConfigModule } from '@nestjs/config';
import { HttpModule, Module } from '@nestjs/common';

import { GetAdsHousingController } from './HousingDepartment/Infrastructure/getAdsHousing.controller';
import { GetAdsHousingService } from './HousingDepartment/Domain/services/getAdsHousing.service';
import { GetAdsHousingUseCase } from './HousingDepartment/Domain/useCases/getAdsHousing.usecase';

import configuration from '../config/configuration';

@Module({
  imports: [ConfigModule.forRoot({
    load: [configuration],
    isGlobal: true
  }), HttpModule],
  controllers: [GetAdsHousingController],
  providers: [GetAdsHousingService, GetAdsHousingUseCase]
})
export class AppModule {}
