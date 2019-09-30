export class RegisterInfo {
    constructor(
        private name: string,
        private username: string,
        private email: string,
        private password: string,
        private securityQuestion: string,
        private answer: string,
        private roles: string[] = ['user']
    ) {}
}