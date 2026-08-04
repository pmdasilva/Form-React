import React from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
    isAuthenticated: boolean;
    userRole: string;
    children: React.ReactNode;
};

export function ProtectedRoute({ isAuthenticated, userRole, children }: ProtectedRouteProps): React.ReactElement {
    if (!isAuthenticated) {
        return (
            <Navigate
                to="/"
                replace
                state={{ message: "Voce precisa fazer login para acessar esta pagina." }}
            />
        );
    }

    if (userRole !== "user") {
        return (
            <Navigate
                to="/"
                replace
                state={{ message: "Seu usuario nao tem permissao para acessar esta pagina." }}
            />
        );
    }

    return <>{children}</>;
}


