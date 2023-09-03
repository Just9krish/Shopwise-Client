export interface Response {
  success: boolean;
  message: string;
}

export interface UserData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface IUpdateData {
  password: string;
  name: string;
  primaryPhoneNumber: number;
  secondaryPhoneNumber?: number;
  email: string;
}

export interface IAddressFrom {
  country: string;
  state: string;
  address1: string;
  address2: string;
  address3: string;
  zipcode: number;
  addressType: string;
}

export interface IUserPasswordChange {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
