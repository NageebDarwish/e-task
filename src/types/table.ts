import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";

export type HeaderType = {
  name: string;
  key: string;
};

export type TableType = {
  data: [];
  header: HeaderType[];
  searchLink: string;
  loading: boolean;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  deleteFn: UseMutateAsyncFunction<
    AxiosResponse<any, any>,
    Error,
    void,
    unknown
  >;
  setPage: Dispatch<SetStateAction<number>>;
  total: number;
};

export type BaseItem = {
  created_at: Date;
  updated_at: Date;
};
