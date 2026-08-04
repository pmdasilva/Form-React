// components/FormInput.tsx

import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export function FormInput(props: Props) {
    return (
        <input
            {...props}
            className="
                w-full
                rounded-lg
                border
                border-gray-300
                px-4
                py-2
                focus:border-blue-500
                focus:outline-none
                focus:ring-2
                focus:ring-blue-200
            "
        />
    );
}