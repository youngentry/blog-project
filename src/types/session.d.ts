interface UserSessionData {
  user: {
    name: string;
    email: string;
    image: string;
  };
}

interface Params {
  params: {
    [key: string]: string;
  };
}
