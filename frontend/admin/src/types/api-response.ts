/* eslint-disable @typescript-eslint/no-explicit-any */
// types/api-response.ts

export interface ApiResponseSuccess<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiResponseError {
  success: false;
  error: {
    message: string;
    code: number;
    details: any;
  };
}

export type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError;
