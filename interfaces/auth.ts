export interface AuthData {
  jwt: string;
  user?: UserData;
  primary?: PrimaryData;
  personal?: PersonalData;
}

export interface ProfileData {
  id: number;
  username: string;
  telp: string | null;
  name: string | null;
  role: string | null;
  gender: number | null;
  dob: string | null;
  institute: string | null;
  point: number;
  filled: boolean;
  photo: string | null;
  interest: Array<string>;
}

export interface UserData extends ProfileData {
  createdAt: string;
  updatedAt: string;
  email: string;
}

export interface PrimaryData {
  telp: string | null;
  name: string | null;
  email: string;
}

export interface PersonalData {
  gender: number | null;
  dob: string | null;
  institute: string | null;
}

export enum LoginStatus {
  UNKNOWN,
  INVALID_CREDS,
  EMAIL_NOT_CONFIRMED,
}


export enum RegisterStatus {
  UNKNOWN,
  USER_EXISTS,
  EMAIL_USED,
  INVALID_EMAIL,
  INVALID_NAME,
}