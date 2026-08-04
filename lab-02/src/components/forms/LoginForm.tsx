import { emailValidation, passwordValidation } from "../../validations/loginSchema";
import ErrorMessage from "../feedback/ErrorMessage";
import { FormInput } from "../ui/FormInput";
import useLoginForm from "../../hooks/useLoginForm";
import { SubmitButton } from "../ui/SubmitButton";

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        onSubmit,
        onInvalidSubmit,
        loginError,
        isLoading,
        clearLoginError,
    } = useLoginForm();

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">

            <form

                onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}

                className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg space-y-4">
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    Login
                </h2>

                <FormInput
                    type="email"
                    placeholder="emal@example.com"
                    {...register("email", emailValidation)}
                />

                <FormInput
                    type="password"
                    placeholder="*********"
                    {...register("password", passwordValidation)}
                />

                <SubmitButton
                    text='Entrar'
                    isLoading={isLoading}
                />

                <ErrorMessage
                    errorMessage={loginError}
                    onClose={clearLoginError}
                />
            </form>

        </div>
    );
}