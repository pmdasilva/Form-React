export default function Home() {
    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <h1 className="text-2xl font-bold text-slate-800">
                        Dashboard
                    </h1>

                    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                        {user.email}
                    </span>
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