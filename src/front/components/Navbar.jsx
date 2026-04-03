import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        dispatch({ type: "logout" });
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-light bg-light px-4">
            <Link to="/" className="navbar-brand fw-bold">JWT Auth</Link>
            <div className="d-flex gap-2">
                {store.token ? (
                    <>
                        <Link to="/private" className="btn btn-outline-success">Area Privada</Link>
                        <button onClick={handleLogout} className="btn btn-danger">Cerrar Sesion</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn btn-outline-primary">Iniciar Sesion</Link>
                        <Link to="/signup" className="btn btn-outline-secondary">Registrarse</Link>
                    </>
                )}
            </div>
        </nav>
    );
};
