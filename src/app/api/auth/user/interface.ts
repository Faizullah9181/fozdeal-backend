export interface IUserRegister {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: string;
    phone: string;
    country_code: string;
    about: string;
    gender: string;
    language: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}
