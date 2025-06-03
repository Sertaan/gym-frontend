import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import React from "react";

const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/api/login", {
                username,
                password
            });

            const token: string = response.data.token;
            localStorage.setItem("authToken", token);

            navigate("/Dashboard");
        } catch (err) {
            setError("Inloggningen misslyckades.");
            console.error(err);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <h2>Logga in</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Användarnamn"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /><br />
                <input
                    type="password"
                    placeholder="Lösenord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br />
                <button type="submit">Logga in</button>
            </form>
        </div>
    );
};

export default Login;
