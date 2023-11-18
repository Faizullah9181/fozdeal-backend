export interface IRequestResponse {
    status: boolean;
    message: string;
    data: object;
    statusCode: number;
}

export interface IAccessToken {
    accessToken: string;
    refreshToken: string;
}
