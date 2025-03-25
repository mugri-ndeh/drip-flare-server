export class FailureResponse {
  error?: true;
  message?: string;

  constructor(message: string) {
    this.error = true;
    this.message = message;
  }

  static create(message: any): FailureResponse {
    if (typeof message !== 'string') {
      return new FailureResponse(message.toString());
    }
    return new FailureResponse(message);
  }
}
