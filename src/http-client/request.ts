import { notification } from "antd";
import axios, { AxiosHeaders } from "axios";
import Cookies from "js-cookie";
import { RequestMethod, RequestType } from "../types/request";

export const doRequest = async ({
  url,
  baseUrl,
  method = RequestMethod.GET,
  params,
  body,
  authen,
  onGotError,
  onGotSuccess,
}: RequestType) => {
  try {
    const headers: AxiosHeaders = new AxiosHeaders();
    const axiosBaseUrl = baseUrl ?? import.meta.env.VITE_BASE_API_URL;

    if (method !== RequestMethod.GET || authen) {
      const accessToken = Cookies.get("accessToken");
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    const res = await axios({
      method,
      params,
      data: body,
      headers,
      url: url,
      baseURL: axiosBaseUrl,
    });

    if (onGotSuccess) {
      onGotSuccess(res);
    }

    return res;
  } catch (error: any) {
    console.log(error);
    if (onGotError) {
      onGotError(error);
    }
    if (error.response && error.response.message) {
      notification.error({ message: error.response.message });
    }

    notification.error({ message: "Đã có lỗi xảy ra" });
  }
};
