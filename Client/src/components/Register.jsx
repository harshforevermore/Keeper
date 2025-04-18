import { useForm } from "react-hook-form";
import "../styles/login.css";
import axios from "axios";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios.post("http://localhost:9000/register/submit", {
      username: data.username,
      email: data.email,
      password: data.password
    },
  {
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => console.log(res.data))
    .catch(err => console.error(err.message));
  };

  return (
    <div className="login-container">
      <form className="login-form-container" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="heading">Create Account</h1>
        <input
          {...register("username", {
            required: "Username is required",
            minLength: { value: 5, message: "Minimum 5 characters required" },
            maxLength: { value: 15, message: "Maximum 15 characters required" },
            pattern: {
              value: /^[a-zA-Z0-9]+$/,
              message: "Only letters and numbers allowed",
            },
          })}
          id="registration-username"
          placeholder="Username"
          autoComplete="off"
          style={errors.username ? { borderBottom: "1px solid red" } : null}
        />
        {errors.username && (
          <span className="error">{errors.username.message}</span>
        )}
        <input
          {...register("email", {
            required: "email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email",
            },
          })}
          id="registration-email"
          placeholder="Email"
          autoComplete="off"
          style={errors.email ? {borderBottom: "1px solid red"} : null}
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
        <input
          {...register("password", {
            required: "Password is required",
            minLength: { value: 5, message: "Minimum 5 characters required" },
            maxLength: { value: 15, message: "Maximum 15 characters required" },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d).{5,15}$/,
              message: "Must contain an uppercase letter and a number",
            },
          })}
          type="password"
          id="registration-password"
          placeholder="Password"
          autoComplete="off"
          style={errors.password ? { borderBottom: "1px solid red" } : null}
        />
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}
        <input
          {...register("confirmPass", {
            required: "Confirm your password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
          type="password"
          id="registration-confirm-password"
          placeholder="Confirm Password"
          autoComplete="off"
          style={errors.confirmPass ? { borderBottom: "1px solid red" } : null}
        />
        {errors.confirmPass && (
          <span className="error">{errors.confirmPass.message}</span>
        )}
        <button type="submit" className="button-style">
          Register
        </button>
        <p>
          Already have a account? <a href="/login">Login here</a>
        </p>
      </form>
    </div>
  );
}

export default Register;
