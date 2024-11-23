export type options = {
  value: string;
  name: string;
};

export type mainInput = {
  title: string;
  name: string;
  type: string;
  placeholder: string;
  select?: boolean;
  options?: options[];
  setFieldValue?: any;
  multiple?: boolean;
};
