import { useEffect, useState } from "react";

type ErrorMessageProps = {
    errorMessage: string;
    onClose: () => void;
    durationSeconds?: number;
};

export default function ErrorMessage({
    errorMessage,
    onClose,
    durationSeconds = 5,
}: ErrorMessageProps) {
    const [timeLeft, setTimeLeft] = useState(durationSeconds);

    useEffect(() => {
        if (!errorMessage) {
            return;
        }

        setTimeLeft(durationSeconds);

        const countdownInterval = window.setInterval(() => {
            setTimeLeft((previous) => {
                if (previous <= 1) {
                    onClose();
                    return 0;
                }

                return previous - 1;
            });
        }, 1000);

        return () => {
            window.clearInterval(countdownInterval);
        };
    }, [errorMessage, durationSeconds, onClose]);

    if (!errorMessage) {
        return null;
    }

    return (
        <div className="fixed right-4 top-4 z-50 w-full max-w-sm rounded-lg border border-red-200 bg-white p-4 shadow-lg">
            <div className="mb-2 flex items-start justify-between gap-3">
                <div>
                    <h2 className="text-sm font-semibold text-red-700">Acesso negado</h2>
                    <p className="mt-1 text-sm text-slate-700">{errorMessage}</p>
                </div>
                <button
                    onClick={onClose}
                    className="rounded px-2 py-1 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                >
                    Fechar
                </button>
            </div>

            <div className="mb-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                    className="h-full rounded-full bg-red-500 transition-all duration-1000"
                    style={{ width: `${(timeLeft / durationSeconds) * 100}%` }}
                />
            </div>

            <p className="text-right text-xs text-slate-500">Fecha em {timeLeft}s</p>
        </div>
    );
}