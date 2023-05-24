import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import { useLogin } from "../../hooks/useLogin";
import "./Login.css";
import background from "../../assets/landing/landing-background.jpg";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userError, error, isLoading, login } = useLogin();

  async function handleSubmit(event) {
    event.preventDefault();
    await login(email, password);
  }

  useEffect(() => {
    return () => {
      // Clean up any resources, such as subscriptions
      // or async tasks
    };
  }, []);

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="login-div has-loading">
        <h2>Log in to My diary</h2>
        <br />
        <p>
          You will be able to comment on posts, save posts to your calendar and
          find friends according to your interests
        </p>
        <br />
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              placeholder="Email"
              className="login-input"
              autoComplete="email"
            />
          </label>
          <br />
          <label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              minLength="8"
              placeholder="Password"
              className="login-input"
              autoComplete="current-password"
            />
          </label>
          <br />
          <button type="submit" className="login-button">
            Log in
          </button>
          <button type="button" className="signup-button">
            <Link to="/signup">Sign up</Link>
          </button>
        </form>
        <br />
        {isLoading && <Loading />}
        {error && (
          <div className="error">
            {typeof error === "string"
              ? error
              : "Error happened. Refresh the page"}
          </div>
        )}
        {userError && (
          <div className="error">
            {typeof userError === "string"
              ? userError
              : "Error happened. Refresh the page"}
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginForm;
