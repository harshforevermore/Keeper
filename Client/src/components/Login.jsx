import { useForm } from "react-hook-form";
import "../styles/login.css";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const [loggedIn, setLoggedIn] = useState(false);

  const onSubmit = (data) => {
    axios
      .post(
        "http://localhost:9000/u/login",
        {
          username: data.username,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.exists) {
          setLoggedIn(true);
        }
      })
      .catch((err) => console.error(err.message));
  };

  return (
    <div className="login-container">
      <form className="login-form-container" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="heading">Login</h1>
        <div className="input-fields">
          <section className="username-field">
            <input
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 5,
                  message: "Minimum 5 characters required",
                },
                maxLength: {
                  value: 15,
                  message: "Maximum 15 characters required",
                },
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: "Only letters and numbers allowed",
                },
              })}
              id="login-username"
              placeholder="Username"
              autoComplete="off"
              style={errors.username ? { borderBottom: "1px solid red" } : null}
            />
            {errors.username && (
              <span className="error">{errors.username.message}</span>
            )}
          </section>
          <section className="password-field">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Minimum 5 characters required",
                },
                maxLength: {
                  value: 15,
                  message: "Maximum 15 characters required",
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d).{5,15}$/,
                  message: "Wrong Format!",
                },
              })}
              type="password"
              id="login-password"
              placeholder="Password"
              autoComplete="off"
              style={errors.password ? { borderBottom: "1px solid red" } : null}
            />
            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}
          </section>
        </div>
        <div className="misc">
          <button type="submit" id="login-button" className="button-style">
            Login
          </button>
          <p>
            Don't have a account? <a href="/registration">Register here</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
