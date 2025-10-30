import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./../../components/AuthForm";
import { useAuth } from "../../context/AuthContext";
import "./../../App.css";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();
  const { fetchUser } = useAuth();

  useEffect(() => {
    // Gin verify it user gamit an cookie (credentials)
    const verifySession = async () => {
      try {
        const res = await fetch("http://localhost:5000/verify", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (data.success) {
          navigate("/dashboard");
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("Session check failed:", err);
        setLoading(false);
      }
    };
    
    verifySession();
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // sends/receives cookies for login
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        await fetchUser();
        alert(data.message);
        navigate("/dashboard");
      } else {
        alert(data.error || data.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  if (loading) return null;

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
