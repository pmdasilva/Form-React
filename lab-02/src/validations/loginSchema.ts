// validations/loginSchema.ts
export const emailValidation = {
    required: "Email obrigatório",
    pattern: {
        value: /\S+@\S+\.\S+/,
        message: "E-mail inválido",
    },
};

export const passwordValidation = {
    required: "Senha obrigatória",
    minLength: {
        value: 6,
        message: "Mínimo de 6 caracteres",
    },
};