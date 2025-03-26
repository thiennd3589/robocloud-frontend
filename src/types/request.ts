import { AxiosError, AxiosResponse } from "axios";

export enum RequestMethod {
  POST = "POST",
  PUT = "PUT",
  GET = "GET",
  DELETE = "DELETE",
}

export type RequestType = {
  url: string;
  baseUrl?: string;
  method?: RequestMethod;
  params?: any;
  body?: any;
  authen?: boolean;
  onGotSuccess?: (res: AxiosResponse) => void;
  onGotError?: (res?: AxiosError<ErrorResponse>) => void;
};

export type ErrorResponse = {
  error: {
    message: string;
    name: string;
    statusCode: number;
  };
};
