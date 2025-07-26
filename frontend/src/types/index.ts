export type SearchResponse = {
  value: number;
  index: number;
  message: string;
};

export type ErrorResponse = {
  error: string;
  message: string;
};

export type ApiError = {
  detail: ErrorResponse;
}; 