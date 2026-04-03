import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Login = () => {
    const { dispatch } = useGlobalReducer();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        console.log("Backend URL:", backendUrl);
        try {
            const resp = await fetch(`${backendUrl}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const data = await resp.json();
            console.log("Respuesta:", resp.status, data);
            if (resp.ok) {
                sessionStorage.setItem("token", data.token);
                dispatch({ type: "login", payload: data.token });
                navigate("/private");
            } else {
                setError(data.msg || "Credenciales incorrectas");
            }
        } catch (err) {
            console.error("Error en login:", err);
            setError("Error de conexión con el servidor: " + err.message);
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "400px" }}>
            <h2>Iniciar Sesión</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    className="form-control mb-2"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="form-control mb-2"
                    placeholder="Contraseña"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="btn btn-primary w-100">Entrar</button>
            </form>
            <p className="mt-2"><Link to="/signup">¿Sin cuenta? Regístrate aquí</Link></p>
        </div>
    );
};
