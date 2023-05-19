export type RecordId = string | number;

export type SecurityConfig = {
  jwt_secret: string;
};

export type KafkaConfig = {
  brokers: string[];
  groupId: string;
};

export type GenderOptions = 'male' | 'female' | 'others';

export interface RequestPasswordResponse {
  message: string;
}

export interface ValidationError {
  error: string;
  message: string;
}

export interface PublishType {
  key: string;
  receiving_email?: string;
  value?: any;
}

export enum EventsEmitted {
  new_user = 'user.newly.created',
  user_login = 'user.login',
}
