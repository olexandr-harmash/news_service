import { HttpException, HttpStatus } from '@nestjs/common';

export enum InternalErrorsMessage {
  INTERNAL_SERVER_ERROR = 'something are wrong',
  NOT_FOUND = 'data not found',
  BAD_REQUEST = 'bad request',
  REPEAT_DATA = 'repeat data'
}

export class ApiErrors extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super(message, status)
  }

  //в идеале вынести ошибки бд и уровня приложения в отдельные файлы
  // и преобразовывать уровень бд в уровень приложения перед отправкой в сервисах
  // но делаем преобразование сразу
  static parseError(error: any) {
    //лучше сравнивать типы
    if (error.parent) {
      switch(Number(error.parent.code)) {
        case 23505:
          return new ApiErrors(InternalErrorsMessage.REPEAT_DATA, HttpStatus.BAD_REQUEST)
          //sequelize ignored it
        case 23503:
          return new ApiErrors(InternalErrorsMessage.NOT_FOUND, HttpStatus.NOT_FOUND)
        default:
          return new ApiErrors(InternalErrorsMessage.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
    return error
  }
}
