import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Private = () => {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, []);

    return (
        <div className="container mt-5">
            <div className="card shadow">
                <div className="card-body bg-dark text-white rounded p-5">
                    <h1>Zona Privada</h1>
                    <hr className="border-light" />
                    <p className="lead">Bienvenido! Has iniciado sesion correctamente.</p>
                    <p>Este contenido solo es visible para usuarios autenticados.</p>
                </div>
            </div>
        </div>
    );
};
