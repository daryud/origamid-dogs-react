import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { useForm } from "../../hooks/useForm";
import { Error } from "../Error/Error";
import Button from "../Forms/Button/Button";
import Input from "../Forms/Input/Input";

import styles from "./LoginForm.module.css";
import stylesButton from "../Forms/Button/Button.module.css";

const LoginForm = () => {
  const username = useForm();
  const password = useForm();
  const { userLogin, error, loading } = React.useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        <Error error={error} />
      </form>
      <Link className={styles.lost} to="/login/perdeu">
        Perdeu a Senha?
      </Link>
      <div className={styles.register}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
      </div>
      <Link className={stylesButton.button} to="/login/criar">
        Cadastro
      </Link>
    </section>
  );
};

export default LoginForm;
