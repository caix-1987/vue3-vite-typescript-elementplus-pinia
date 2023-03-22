export interface IApiResponseData<T> {
  code: number;
  data: T;
  message: string;
}

export interface LoginFormRequest {
  username: "admin" | "guest";
  password: string;
}

export type LoginCodeResponseData = IApiResponseData<string>;

export type LoginResponseData = IApiResponseData<{ token: string }>;

export type UserInfoResponseData = IApiResponseData<{
  username: string;
  roles: string[];
}>;
