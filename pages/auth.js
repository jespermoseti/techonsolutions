import classes from "./auth.module.css";
import AuthForm from "../components/authpage/authform";

function Auth() {
  return (
    <div className={classes.auth}>
      <AuthForm />
    </div>
  );
}
export default Auth;
