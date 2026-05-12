import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Login() {

  // Form state for email & password
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  // React Router navigation hook
  const navigate = useNavigate();

  // Handle admin login
  const handleLogin = async () => {

    try {

      // Send login request
      const res = await API.post(
        "/auth/login",
        form
      );

      // Store JWT token
      localStorage.setItem(
        "token",
        res.data.token
      );

      // Store admin details
      localStorage.setItem(
        "admin",
        JSON.stringify(res.data.admin)
      );

      // Navigate to admin dashboard
      navigate("/admin");

    } catch (err) {

      // Show error alert
      alert("Login failed");
    }
  };

  return (

    // Full screen centered container
    <div className="container d-flex justify-content-center align-items-center vh-100">

      {/* Login Card */}
      <div
        className="card p-4 shadow"
        style={{ width: "350px" }}
      >

        {/* Login Title */}
        <h3 className="text-center mb-3">
          Admin Login
        </h3>

        {/* Email Input */}
        <input
          className="form-control mb-3"
          placeholder="Email"
          type="email"
          onChange={e =>
            setForm({
              ...form,
              email: e.target.value
            })
          }
        />

        {/* Password Input */}
        <input
          className="form-control mb-3"
          placeholder="Password"
          type="password"
          onChange={e =>
            setForm({
              ...form,
              password: e.target.value
            })
          }
        />

        {/* Login Button */}
        <button
          className="btn btn-primary w-100"
          onClick={handleLogin}
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;