import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error1, setUsernameError] = useState("");
    const [error2, setPasswordError] = useState("");

    const handleUsernameChange = (e) => {
        const usernameValue = e.target.value;
        if (usernameValue === "") {
            setUsernameError("*Required");
        } else {
            setUsername(usernameValue);
            setUsernameError("");
        }
    };

    const handlePasswordChange = (e) => {
        const passwordValue = e.target.value;
        if (passwordValue === "") {
            setPasswordError("*Required");
        } else {
            setPassword(passwordValue);
            setPasswordError("");
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();

        // Validasi input
        if (!username || !password) {
            if (!username) setUsernameError("*Required");
            if (!password) setPasswordError("*Required");
            return;
        }

        // Cek login admin secara langsung
        if (username === "admin" && password === "admin") {
            sessionStorage.setItem("email", "admin@example.com"); // Simpan data admin di sessionStorage
            sessionStorage.setItem("name", "Admin");
            sessionStorage.setItem("isadmin", true);
            navigate("/admin"); // Arahkan ke halaman admin khusus
            return;
        }

        // Proses login biasa
        fetch("http://localhost:8003/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: username,
                password: btoa(password), // Encode password ke base64
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.auth) {
                    sessionStorage.setItem("email", data.email);
                    sessionStorage.setItem("name", data.name);
                    sessionStorage.setItem("isadmin", data.isadmin);

                    if (data.isadmin) {
                        navigate("/multiuser"); // Admin navigasi ke halaman admin
                    } else {
                        navigate("/todo"); // Non-admin navigasi ke halaman tugas
                    }
                } else {
                    alert("Bad Credentials !!");
                }
            })
            .catch((error) => {
                console.error("Login error:", error);
                alert("An error occurred during login.");
            });
    };

    return (
        <div>
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-lg-4 me-2"></div>
                    <div className="col-lg mt-2">
                        <div style={{ backgroundColor: "#f3f3f3" }} className="p-3">
                            <div className="d-flex justify-content-between">
                                <h2 className="text-secondary">Login to our site</h2>
                                <div>
                                    <i className="fa fa-key" style={{ opacity: "0.3", fontSize: "40px" }}></i>
                                </div>
                            </div>

                            <p className="text-secondary">Enter the user name and password to log on</p>
                            <form onSubmit={handleLogin}>
                                <div className="field">
                                    <input
                                        type="text"
                                        className="form-control mt-2"
                                        placeholder="Username.."
                                        id="username"
                                        value={username}
                                        onChange={handleUsernameChange}
                                    />
                                    <small style={{ color: "red" }}>{error1}</small>
                                </div>
                                <div className="field">
                                    <input
                                        type="password"
                                        className="form-control mt-2"
                                        placeholder="Password.."
                                        id="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                    <small style={{ color: "red" }}>{error2}</small>
                                </div>
                                <div className="d-flex justify-content-center mt-2">
                                    <button className="btn btn-primary flex-fill me-1" id="btnSign">
                                        Log in!
                                    </button>
                                </div>
                            </form>

                            <div>
                                <div className="mt-1">
                                    <span className="mt-3" style={{ textAlign: "center" }}>
                                        Don't have an account yet?
                                    </span>
                                    <a href="/signin" className="mt-3">Sign Up</a>
                                </div>
                                <p className="mt-3" style={{ textAlign: "center" }}>or connect with:</p>
                                <div className="d-flex justify-content-center">
                                    <a href="https://www.facebook.com/login/" className="btn btn-primary me-1 flex-fill" style={{ backgroundColor: "#4762a2" }}>
                                        <i className="fa fa-facebook fa-fw"></i> Facebook
                                    </a>
                                    <a href="https://www.twitter.com/login/" className="btn btn-info me-1 flex-fill text-light" style={{ backgroundColor: "#55abec" }}>
                                        <i className="fa fa-twitter fa-fw text-light"></i> Twitter
                                    </a>
                                    <a href="https://www.google.com/login/" className="btn btn-danger flex-fill" style={{ backgroundColor: "#dc4b38" }}>
                                        <i className="fa fa-google fa-fw"></i> Google+
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 me-2"></div>
                </div>
            </div>
        </div>
    );
}

export default Login;
