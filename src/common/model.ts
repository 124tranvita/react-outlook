export type Response<T> = {
  status: string;
  data: T;
  headers: object;
};
