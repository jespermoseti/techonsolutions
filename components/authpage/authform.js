import { useState, useRef, useContext } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import NotificationContext from "../../store/notification-context";
import classes from "./authform.module.css";

async function createUser(email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

function AuthForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);

  const router = useRouter();

  const notificationCtx = useContext(NotificationContext);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      emailInputRef.current.value = "";
      passwordInputRef.current.value = "";

      if (!result.error) {
        // set some auth state
        notificationCtx.showNotification({
          title: "Success",
          message: "Logged in",
          status: "success",
        });
        router.replace("/dashboard");
      } else {
        notificationCtx.showNotification({
          title: "Failed",
          message: "Wrong credentials or unauthorized user",
          status: "error",
        });
        router.replace("/dashboard");
      }
    } else {
      try {
        const data = await createUser(enteredEmail, enteredPassword);

        notificationCtx.showNotification({
          title: "Success",
          message: data.message,
          status: "success",
        });

        emailInputRef.current.value = "";
        passwordInputRef.current.value = "";
      } catch (error) {
        notificationCtx.showNotification({
          title: "Failed",
          message: error.message,
          status: "error",
        });
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}
export default AuthForm;
