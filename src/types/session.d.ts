export interface UserSessionData {
  user: {
    name: string;
    email: string;
    image: string;
  };
}

export interface Params {
  params: {
    [key: string]: string;
  };
}
