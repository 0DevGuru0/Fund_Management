export class NetworkError extends Error {
  status: number;
  body: any;

  constructor(errorResponse: Response) {
    super(`${errorResponse.status} ${errorResponse.statusText}`);
    this.name = 'NetworkError';
    this.status = errorResponse.status;
    this.body = errorResponse.json();
  }
}
