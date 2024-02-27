import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ErrorHandlerService {
  handleServerError(error: any) {
    console.error('Wystąpił błąd:', error);
    throw new HttpException(
      'Wystąpił błąd na serwerze',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
