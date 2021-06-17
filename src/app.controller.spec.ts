import { Test, TestingModule } from '@nestjs/testing';
import { GetAdsHousingController } from './HousingDepartment/Infrastructure/getAdsHousing.controller';
import { GetAdsHousingService } from './HousingDepartment/Domain/services/getAdsHousing.service';

describe('GetInformationController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [GetAdsHousingController],
      providers: [GetAdsHousingService],
    }).compile();
  });

  describe('getAdsHousing', () => {
    it('should return "Hello World!"', () => {
      const getInformationController = app.get<GetAdsHousingController>(GetAdsHousingController);
      expect(getInformationController.getAdsHousing()).toBe('Hello World!');
    });
  });
});
