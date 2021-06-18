import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GetAdsHousingService {

  constructor(private httpService:HttpService, private configService: ConfigService){
    this.configService = configService;
  }

  async getAdsHousing() {
    const JSON_URL = this.configService.get<string>('api.url');
    return this.httpService.get(JSON_URL);
  }
}
