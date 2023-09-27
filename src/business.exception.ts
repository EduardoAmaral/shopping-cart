import { UnprocessableEntityException } from '@nestjs/common';

export default class BusinessException extends UnprocessableEntityException {
  constructor(message: string) {
    super(message);
  }
}
