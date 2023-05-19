import { GenderOptions } from 'src/types/types';
import { IAuditable } from 'src/types/auditable.types';

export type UserStatus = 'blocked' | 'disabled' | 'active' | 'inactive';

export type AuthType =
  | 'google_authenticator'
  | 'microsoft_authenticator'
  | 'last_pass_authenticator'
  | 'twilio_authy'
  | 'duo_mobile'
  | 'others';

export type UserSettingAction = 'two_factor' | 'all';

export interface IUserSecret extends IAuditable {
  id?: number;
  user_id: number;
  user: IUser;
  auth_type: AuthType;
  ascii: string;
  hex: string;
  secret: string;
  totp_url: string;
}

export interface ITwoFactorAccess {
  qr_code_path?: string;
  secret?: string;
  totp_url?: string;
  verified?: boolean;
  auth_type?: AuthType;
}

export interface LoginFlow {
  password?: string;
  active?: boolean;
  status?: UserStatus;
  num_login_attempts?: number;
  last_login_date?: Date;
}

export interface IUserAccess {
  user?: IUser;
  has_access?: boolean;
}

export interface IUser extends IAuditable {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  gender?: GenderOptions;
  dob?: Date;
  uuid?: string;
  is_email_verified?: boolean;
  last_login_date?: Date;
  num_login_attempts?: number;
  has_active_password_reset_link?: boolean;
  status?: UserStatus;
  active?: boolean;
}

export interface IUserSetting extends IAuditable {
  id?: number;
  user_id: number;
  user?: IUser;
  two_factor_enabled: boolean;
  notification_enabled: boolean;
  notification_email: string;
}

export interface ILogin {
  access_token: string;
  user?: IUser;
}

export interface IOptions {
  expiresIn?: string;
}
