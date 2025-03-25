import { GlobalConstant } from './constants';

export class SuccessResponse<T> {
  error?: false;
  data?: T;
  message?: GlobalConstant.SUCCESSFUL_RESPONSE;

  constructor(data?: T, message?: GlobalConstant.SUCCESSFUL_RESPONSE) {
    this.error = false;
    this.data = data;
    this.message = message || GlobalConstant.SUCCESSFUL_RESPONSE;
  }

  static create<T>(data?: T, message?: GlobalConstant.SUCCESSFUL_RESPONSE): SuccessResponse<T> {
    return new SuccessResponse<T>(data, message);
  }
}
