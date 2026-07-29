type Props = {
    text: string;
    isLoading?: boolean;
};

export function SubmitButton({
    text,
    isLoading = false,
}: Props) {
    return (
        <input
            type="submit"
            value={isLoading ? "Entrando..." : text}
            disabled={isLoading}
            className="
                w-full
                cursor-pointer
                rounded-lg
                bg-blue-600
                py-2
                text-white
                disabled:opacity-50
                disabled:cursor-not-allowed
            "
        />
    );
}
