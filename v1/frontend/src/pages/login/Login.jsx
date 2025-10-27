import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./../../components/AuthForm";
import "./../../App.css";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        credentials: "include", // ✅ required
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        navigate("/dashboard");
      } else {
        alert(data.message || data.error);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again.");
    }
  };


  const fields = [
    {
      label: "Email",
      name: "email",
      type: "email",
      value: form.email,
      onChange: handleChange,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      value: form.password,
      onChange: handleChange,
    },
  ];

  return (
    <AuthForm
      title="Login"
      className="center"
      fields={fields}
      onSubmit={handleSubmit}
      submitLabel="Login"
    >
      <p>
        <a href="/forgotpass">Forgot password?</a>
      </p>
      <button>
        <a href="/register">Create new account</a>
      </button>
    </AuthForm>
  );
}

export default Login;
