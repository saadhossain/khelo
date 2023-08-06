export interface RegisterUser {
  picture?: string;
  name: string;
  email: string;
  user_id: string;
  email_verified?: boolean;
}

export interface User extends RegisterUser {
  firebase?: {
    identities: {
      [key: string]: any;
    };
    sign_in_provider: string;
    sign_in_second_factor?: string;
    second_factor_identifier?: string;
    tenant?: string;
    [key: string]: any;
  };
  phone_number?: string;
  [key: string]: any;
}
