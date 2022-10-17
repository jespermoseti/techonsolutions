import { BsPower } from "react-icons/bs";
import classes from "./logo.module.css";

function Logo() {
  return (
    <div className={classes.logo}>
      <div className={classes.icon}>
        <BsPower />
      </div>
      <div className={classes.LogoText}>
        <p>Techonsolutions</p>
      </div>
    </div>
  );
}
export default Logo;
