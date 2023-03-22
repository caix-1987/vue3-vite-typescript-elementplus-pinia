export interface IApiResponseData<T> {
  code: number;
  data: T;
  message: string;
}

export interface ICreateTableRequestData {
  username: string;
  password: string;
}

export interface IUpdateTableRequestData {
  id: string;
  username: string;
  password?: string;
}

export interface IGetTableRequestData {
  currentPage: number;
  size: number;
  username?: string;
  phone?: string;
}

export interface IGetTableData {
  createTime: string;
  email: string;
  id: string;
  phone: string;
  roles: string;
  status: boolean;
  username: string;
}

export type GetTableResponseData = IApiResponseData<{
  list: IGetTableData[];
  total: number;
}>;
