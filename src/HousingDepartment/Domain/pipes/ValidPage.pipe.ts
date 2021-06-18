import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ValidPage implements PipeTransform<number, number> {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!isNaN(value)) {
      if (value < 0) return 0;
      return parseInt(value);
    } else {
      return false;
    }
  }
}
