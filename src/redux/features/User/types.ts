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
  primaryPhoneNumber: string;
  secondaryPhoneNumber?: string;
  email: string;
}

export interface IAddressFrom {
  country: string;
  state: string;
  address1: string;
  address2: string;
  address3: string;
  zipcode: string;
  addressType: string;
}
