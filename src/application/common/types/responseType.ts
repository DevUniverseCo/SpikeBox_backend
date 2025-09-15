export type ErrorResponseType = {
  status: "error";
  statusCode: number;
  message: string;
};

export type DataResponseSingleType<T> = {
  message: string;
  data: T;
};

export type DataResponseArrayType<T> = {
  message: string;
  data: T[];
};
