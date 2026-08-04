// Hook responsavel por comportamento do nosso formulario, como a parte de inputs que recebem e enviam parametros;
import { useForm } from 'react-hook-form';
import type { SubmitErrorHandler } from 'react-hook-form';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from "react";
import type { LoginFormData } from '../types/auth';




export default function useLoginForm() {

    const navigate = useNavigate();
    const [loginError, setLoginError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
    } = useForm<LoginFormData>();

    const email = watch("email");
    const password = watch("password");

    const clearLoginError = useCallback(() => {
        setLoginError("");
    }, []);

    const onInvalidSubmit: SubmitErrorHandler<LoginFormData> = (errors) => {
        const firstError = errors.email?.message || errors.password?.message;

        if (typeof firstError === "string" && firstError.length > 0) {
            setLoginError(firstError);
            return;
        }

        setLoginError("Preencha os campos obrigatorios.");
    };

    useEffect(() => {
        if (loginError) {
            setLoginError("");
        }
    }, [email, password]);



    const onSubmit = async (data: LoginFormData) => {


        try {
            setIsLoading(true);
            setLoginError("");

            // armazena em user os dados email e passar e aguardar validar com os dados na api, para validar se o usuario existe:
            const user = await authService.login(
                data.email,
                data.password
            );

            if (!user) {
                setLoginError("E-mail ou senha invalidos");
                return;
            }

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            navigate("/home", {
                state: { message: "Login realizado com sucesso." }
            });

        } catch {
            setLoginError("Erro ao conectar com o servidor");
        } finally {
            setIsLoading(false);
        }

    };

    return {
        register,
        handleSubmit,
        loginError,
        isLoading,
        onSubmit,
        onInvalidSubmit,
        clearLoginError
    };
}