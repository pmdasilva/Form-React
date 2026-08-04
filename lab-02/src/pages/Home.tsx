import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutButton from "../components/auth/LogoutButton";

type HomeNavigationState = {
    message?: string;
};

export default function Home() {
    const location = useLocation();
    const navigate = useNavigate();
    const navigationState = location.state as HomeNavigationState | null;
    const initialMessage = navigationState?.message || "";
    const [popupMessage, setPopupMessage] = useState(initialMessage);
    const [timeLeft, setTimeLeft] = useState(initialMessage ? 5 : 0);

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    const closePopup = useCallback(() => {
        setPopupMessage("");
        navigate("/home", { replace: true, state: null });
    }, [navigate]);

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
    }, [popupMessage, closePopup]);



    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100">
            {popupMessage && (
                <div className="fixed right-4 top-4 z-50 w-full max-w-sm rounded-lg border border-emerald-200 bg-white p-4 shadow-lg">
                    <div className="mb-2 flex items-start justify-between gap-3">
                        <div>
                            <h2 className="text-sm font-semibold text-emerald-700">Sucesso</h2>
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
                            className="h-full rounded-full bg-emerald-500 transition-all duration-1000"
                            style={{ width: `${(timeLeft / 5) * 100}%` }}
                        />
                    </div>

                    <p className="text-right text-xs text-slate-500">Fecha em {timeLeft}s</p>
                </div>
            )}
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <h1 className="text-2xl font-bold text-slate-800">
                        Dashboard
                    </h1>

                    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                        {user.email}
                    </span>
                    <LogoutButton

                    />
                </div>
            </header>

            {/* Conteúdo */}
            <main className="mx-auto max-w-6xl p-6">
                {/* Card Principal */}
                <div className="mb-6 rounded-2xl bg-white p-8 shadow-md">
                    <h2 className="mb-2 text-3xl font-bold text-slate-800">
                        Bem-vindo, {user.name}! 👋
                    </h2>

                    <p className="text-slate-600">
                        Você realizou o login com sucesso.
                        Este será seu espaço principal dentro da aplicação.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg">
                        <h3 className="mb-2 text-lg font-semibold text-slate-800">
                            Perfil
                        </h3>

                        <p className="text-sm text-slate-600">
                            Gerencie suas informações pessoais.
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg">
                        <h3 className="mb-2 text-lg font-semibold text-slate-800">
                            Configurações
                        </h3>

                        <p className="text-sm text-slate-600">
                            Ajuste preferências e opções do sistema.
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg">
                        <h3 className="mb-2 text-lg font-semibold text-slate-800">
                            Projetos
                        </h3>

                        <p className="text-sm text-slate-600">
                            Visualize seus projetos e tarefas futuras.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}