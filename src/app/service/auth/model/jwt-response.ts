export class JWTResponse {
    public accessToken: string;
    public tokenType: string;
    public username: string;
    public authorities: string[];
}