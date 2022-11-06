class HttpException extends Error {
  status: number; // propriedade

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export default HttpException;