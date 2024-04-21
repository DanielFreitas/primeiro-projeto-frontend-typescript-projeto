import "./styles.css";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { FormEvent, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const Logo: string = require("../../assets/logo.svg").default;

function SignIn() {
  const navigate = useNavigate();
  const { handleGetToken, handleAddToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      if (!email || !password) {
        throw new Error("Preencha todos os campos");
      }

      const response = await api.post("/login", {
        email,
        password,
      });

      const { accessToken } = response.data;
      handleAddToken(accessToken);
      navigate("/main");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const token = handleGetToken();
    if (token) {
      navigate("/main");
      return;
    }
  }, []);

  return (
    <div className="container container-sign-in">
      <div className="sign-in">
        <img src={Logo} alt="Logo" />

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <span>
            Não tem cadastro? <Link to="">Clique aqui!</Link>
          </span>

          <button className="btn-pink" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
