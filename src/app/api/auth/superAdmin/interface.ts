export interface IUserRegister {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: string;
}

export interface IUserLogin {
    email: string;
    password: string;
    type: string;
}
