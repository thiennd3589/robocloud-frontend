import { AxiosResponse } from "axios";
import { doRequest } from "../../http-client/request";
import { RequestMethod } from "../../types/request";

const BASE_ENDPOINTS = "/authentication";

export const register = async (
  data: any,
  onGotSuccess: () => void,
  onGotError: () => void
) => {
  return doRequest({
    url: `${BASE_ENDPOINTS}/register`,
    body: data,
    method: RequestMethod.POST,
    onGotError,
    onGotSuccess,
  });
};

export const login = async (
  data: any,
  onGotSuccess: (res: AxiosResponse) => void,
  onGotError: (res: any) => void
) => {
  return doRequest({
    url: `${BASE_ENDPOINTS}/login`,
    body: data,
    method: RequestMethod.POST,
    onGotError,
    onGotSuccess,
  });
};
