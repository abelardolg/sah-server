import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class ValidationGuard {
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const fromPage = parseInt(request.params.fromPage);
        if (isNaN(fromPage)) {
            throw new BadRequestException('Number of page not valid');
        } else {
            return (fromPage >= 0);
        }
    }

}
