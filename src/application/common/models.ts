export type SortBy<T extends object> = Array<[keyof T, ("asc" | "desc")?]>;

export type ErrorResponse = {
  status: "error";
  statusCode: number;
  message: string;
};

export type DataResponseSingle<T> = {
  message: string;
  data: T;
};

export type DataResponseArray<T> = {
  message: string;
  data: T[];
};
