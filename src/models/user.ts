export interface User {
    userName: string;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    logged: boolean;
    isExternal: boolean;
    hasPassword: boolean;
    concurrencyStamp: string;
    extraProperties: Record<string, unknown>;
  }
  
  export interface LoginParams {
    userNameOrEmailAddress: string;
    password: string;
    rememberMe: boolean;
  }
  
  export interface LoginExternalParams {
    provider: string;
    idToken?: string;
  }
  
  export interface LoginResult {
    token: string;
  }
  
  export interface UserInfo {
    email: string;
    fullName: string;
    branch: string;
  }
  
  export interface IUser {
    name: string;
    email: string;
  }
  