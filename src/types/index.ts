export interface IUser {
  _id: string;
  avatar: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  links: ILinks[];
  created_at: Date;
}

export interface ILinks {
  is_active: boolean;
  url: string;
  title: string;
}

export interface IPagination {
  limit: String | Number;
  offset: String | Number;
}