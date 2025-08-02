import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import axiosClient from "../API/axiosClient";
import { useContext, useState } from "react";
import { useNotification } from "../Context/Notification/NotificationContext";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const [disableButton, setDisableButton] = useState(false);

  const { login } = useContext(AuthContext);
  const showNotification = useNotification();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setDisableButton(true);
    try {
      const userData = {
        username: data.username,
        password: data.password,
      };
      const res = await axiosClient.post("/u/login", userData);
      login(res.data.publicId);
      setDisableButton(false);
      navigate("/");
      showNotification(res.data.message, "success");
    } catch (error) {
      console.error(
        "Error occured while logging in:",
        error.response?.data?.message || error.message
      );
      setDisableButton(false);
    }
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
          <button
            type="submit"
            className="button-style login-button"
            disabled={disableButton}
          >
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
