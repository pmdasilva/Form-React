import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";

type LoginNavigationState = {
    message?: string;
};

export default function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const [popupMessage, setPopupMessage] = useState("");
    const [timeLeft, setTimeLeft] = useState(5);

    useEffect(() => {
        const navigationState = location.state as LoginNavigationState | null;

        if (navigationState?.message) {
            setPopupMessage(navigationState.message);
            setTimeLeft(5);
        }
    }, [location.state]);

    useEffect(() => {
        if (!popupMessage) {
            return;
        }

        const countdownInterval = window.setInterval(() => {
            setTimeLeft((previous) => {
                if (previous <= 1) {
                    closePopup();
                    return 0;
                }

                return previous - 1;
            });
        }, 1000);

        return () => {
            window.clearInterval(countdownInterval);
        };
    }, [popupMessage]);

    const closePopup = () => {
        setPopupMessage("");
        navigate("/", { replace: true, state: null });
    };

    return (
        <div>
            {popupMessage && (
                <div className="fixed right-4 top-4 z-50 w-full max-w-sm rounded-lg border border-red-200 bg-white p-4 shadow-lg">
                    <div className="mb-2 flex items-start justify-between gap-3">
                        <div>
                            <h2 className="text-sm font-semibold text-red-700">Acesso negado</h2>
                            <p className="mt-1 text-sm text-slate-700">{popupMessage}</p>
                        </div>
                        <button
                            onClick={closePopup}
                            className="rounded px-2 py-1 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                        >
                            Fechar
                        </button>
                    </div>

                    <div className="mb-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                        <div
                            className="h-full rounded-full bg-red-500 transition-all duration-1000"
                            style={{ width: `${(timeLeft / 5) * 100}%` }}
                        />
                    </div>

                    <p className="text-right text-xs text-slate-500">Fecha em {timeLeft}s</p>
                </div>
            )}
            <LoginForm />
        </div>
    );
}