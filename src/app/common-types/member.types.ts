
export interface Member {
  loginId: string;
  nick: string;
  region: string;
  language: string;  
}


export enum AuthType {
  BASIC = 'BASIC', EMAIL = 'EMAIL'
}

export interface Auth {
  type: AuthType;
  id: string;
  password: string;
}

export interface Device {

}