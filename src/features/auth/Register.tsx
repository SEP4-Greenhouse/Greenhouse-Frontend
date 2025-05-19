import React, { useState } from 'react';
import './Login.css';
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (form.username.length < 5) {
      return setError("Username must be at least 5 characters long.");
    }

    if (form.password.length < 8) {
      return setError("Password must be at least 8 characters long.");
    }

    if (!form.email.endsWith("@gmail.com")) {
      return setError("Email must end with @gmail.com.");
    }

    try {
      await register(form);
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
        <p className="switch-auth">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
