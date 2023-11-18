export interface IUserRegister {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: string;
    phone_number: string;
    country_code: string;
    about: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}
