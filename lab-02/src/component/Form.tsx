import { emailValidation, passwordValidation } from '../validations/contactSchema';
import ErrorMassage from './ErrorMassage';
import { FormInput } from './FormInput';
import useContactForm from './hooks/useForm';
import { SubmitButton } from './SubmitButton';

export default function Form() {
    const {
        register,
        handleSubmit,
        onSubmit,
        loginError,
        isLoading,
    } = useContactForm();

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">

            <form

                onSubmit={handleSubmit(onSubmit)}

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

                <ErrorMassage
                    massageError={loginError}
                />
            </form>

        </div>
    );
}