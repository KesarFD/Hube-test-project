export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

export interface SendCodeResponse {
    expiresAt: string;
}