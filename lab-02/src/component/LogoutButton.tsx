import { useState } from "react";
import { useNavigate } from 'react-router-dom';



export default function LogoutButton() {

    const navigate = useNavigate();

    const [isLogoutOut, setLogout] = useState(false);

    return (
        <button
            disabled={isLogoutOut}
            className="
            
            cursor-pointer
            rounded-md
            bg-red-500
            px-4
            py-2
            font-medium
            text-white
            transition-all
            hover:bg-red-600
            disabled:opacity-50
            disabled:cursor-not-allowed
            active:scale-95
            "
            onClick={() => {
                setLogout(true);
                navigate('/');
            }}
        >
            {isLogoutOut ? "Saindo ..." : "Sair"}


        </button>
    );
}
