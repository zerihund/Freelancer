export interface User {
  user_id?: number;
  username: string;
  password?: string;
  email?: string;
  full_name?: string;
  time_created?: Date;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  user_id: number;
}

export interface User {
  user_id?: number;
  username: string;
  password?: string;
  email?: string;
  full_name?: string;
  time_created?: Date;
}

export interface UserExists {
  username: string;
  available: boolean;
}

export interface Media {
  file_id: number;
  user_id: number;
  filename: string;
  filesize: number;
  tag?: string;
  title: string;
  description: string;
  media_type: string;
  mime_type: string;
  time_added: string;
  screenshot?: string;
  thumbnails?: Thumbnail;
}

export interface Thumbnail {
  160: string;
  320?: string;
  640?: string;
}

export interface TagReponse {
  tag_id: number;
  file_id: number;
  tag: string;
  filename: string;
  filesize: number;
  title: string;
  description: string;
  user_id: number;
  media_type: string;
  mime_type: string;
  time_added: string;
}

export interface ModifyUser {
  username?: string;
  password?: string;
  email?: string;
  phone?: string;
}
