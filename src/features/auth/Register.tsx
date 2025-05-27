import React, { useState } from 'react';
import './Login.css';
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // ✅ Simple client-side validation
    if (form.name.length < 3) {
      return setError("Name must be at least 3 characters long.");
    }

    if (form.password.length < 8) {
      return setError("Password must be at least 8 characters long.");
    }

    if (!form.email.includes("@") || !form.email.includes(".")) {
      return setError("Please enter a valid email address.");
    }

    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      navigate("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Register failed.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          {/* ✅ Error with data-testid for test targeting */}
          {error && <p className="error" data-testid="error-message">{error}</p>}


          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
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
