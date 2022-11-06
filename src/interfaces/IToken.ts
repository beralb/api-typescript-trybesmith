export interface IToken {
  payload: {
    username: string;
    password: string;
  };
  iat: number;
  exp: number;
}
