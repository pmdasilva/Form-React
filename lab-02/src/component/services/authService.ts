// services/authService.ts
import { api } from "./api";

export const authService = {
    async login(email: string, password: string) {

        const response = await api.get("/users");


        const user = response.data.find(
            (user: any) =>
                user.email === email &&
                user.password === password
        );

        return user;
    }
};