// Hook responsavel por comportamento do nosso formulario, como a parte de inputs que recebem e enviam parametros;
import { useForm } from 'react-hook-form';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import type { ContactFormData } from '../../types/contact.types';




export default function useContactForm() {

    const navigate = useNavigate();
    const [loginError, setLoginError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
    } = useForm<ContactFormData>();



    const onSubmit = async (data: any) => {


        try {
            setIsLoading(true);
            setLoginError("");

            // armazena em user os dados email e passar e aguardar validar com os dados na api, para validar se o usuario existe:
            const user = await authService.login(
                data.email,
                data.password
            );

            // Se autenticação for valida navegar o usuario para Home:
            if (user) {
                navigate('/home');
            }

            if (!user) {
                setLoginError("E-mail ou senha invalidos");
                return;
            }

            if (user) {

                localStorage.setItem(
                    "user",
                    JSON.stringify(user)
                );

                navigate("/home")

            }

            navigate("/home")

        } catch {
            setLoginError("Erro ao conectar com o servidor");
        } finally {
            setIsLoading(false)
        }

    }

    return {
        register,
        handleSubmit,
        loginError,
        isLoading,
        onSubmit
    };
}