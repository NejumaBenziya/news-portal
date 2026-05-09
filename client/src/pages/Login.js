import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/admin");
      
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
  <div className="container d-flex justify-content-center align-items-center vh-100">
  <div className="card p-4 shadow" style={{ width: "350px" }}>
    <h3 className="text-center mb-3">Admin Login</h3>

    <input
      className="form-control mb-3"
      placeholder="Email"
      type="email"
      onChange={e => setForm({ ...form, email: e.target.value })}
    />

    <input
      className="form-control mb-3"
      placeholder="Password"
      type="password"
      onChange={e => setForm({ ...form, password: e.target.value })}
    />

    <button className="btn btn-primary w-100" onClick={handleLogin}>
      Login
    </button>
  </div>
</div>
  );
}

export default Login;