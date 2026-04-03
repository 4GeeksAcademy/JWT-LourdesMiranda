import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        if (resp.ok) {
            alert("Cuenta creada! Ahora inicia sesion.");
            navigate("/login");
        } else {
            const data = await resp.json();
            alert(data.msg || "Error al registrar");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Crear Cuenta</h2>
            <form onSubmit={handleSignup}>
                <input type="email" className="form-control mb-2" placeholder="Email"
                    value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" className="form-control mb-2" placeholder="Contrasena"
                    value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit" className="btn btn-success">Registrarse</button>
            </form>
            <p className="mt-2"><Link to="/login">Ya tienes cuenta? Inicia sesion</Link></p>
        </div>
    );
};
