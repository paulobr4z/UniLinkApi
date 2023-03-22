export interface IUser {
  _id?: string;
  avatar?: string;
  first_name: string;
  last_name: string;
  bg_color?: string;
  bg_color_link?: string;
  text_color?: string;
  border_color?: string;
  username: string;
  email: string;
  password: string;
  links: ILinks[] | [];
  created_at?: Date;
}

export interface ICreateUser {
  _id?: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
}

export interface ILinks {
  _id?: string;
  is_active: boolean;
  url: string;
  title: string;
}

export interface IPagination {
  limit: String | Number;
  offset: String | Number;
}
