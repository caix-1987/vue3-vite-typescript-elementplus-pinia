import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";
import { get } from "lodash-es";

/* 一、创建请求实例 */
function createService() {
  /* 1、创建一个 Axios 实例 */
  const service = axios.create();

  /* 2、请求拦截 */
  service.interceptors.request.use(
    /* 发送成功 */
    (config) => config,
    /* 发送失败 */
    (error) => Promise.reject(error)
  );

  /* 3、响应拦截 */
  service.interceptors.response.use(
    (response) => {
      /* 响应成功 定义后端返回的数据 apiBackData */
      const apiBackData = response.data as any;
      const code = apiBackData.code;
      if (code === undefined) {
        ElMessage.error("未知 code ");
      } else {
        switch (code) {
          case 0:
            return apiBackData;
          default:
            ElMessage.error(apiBackData.message || "Error");
            return Promise.reject(new Error("Error"));
        }
      }
    },
    (error) => {
      /* 响应失败 获取 HTTP 状态码*/
      const status = get(error, "response.status");
      switch (status) {
        case 400:
          error.message = "请求错误";
          break;
        case 401:
          /* Token 过期 跳转到登陆页面*/
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = "请求地址出错";
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器内部错误";
          break;
        case 501:
          error.message = "服务未实现";
          break;
        case 502:
          error.message = "网关错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网关超时";
          break;
        case 505:
          error.message = "HTTP 版本不受支持";
          break;
        default:
          break;
      }
      ElMessage.error(error.message);
      return Promise.reject(error);
    }
  );
  return service;
}

/* 二、创建请求方法 */
function createRequestFunction(service: AxiosInstance) {
  return function <T>(config: AxiosRequestConfig): Promise<T> {
    const configDefault = {
      headers: {
        /* 携带 Token */
        Authorization: "Token",
        "Content-Type": get(config, "headers.Content-Type", "application/json"),
      },
      timeout: 5000,
      baseURL: import.meta.env.VITE_BASE_API,
      data: {},
    };

    return service(Object.assign(configDefault, config));
  };
}

/* 用于网络请求的实例 */
export const service = createService();

/* 用于网络请求的方法 */
export const request = createRequestFunction(service);
