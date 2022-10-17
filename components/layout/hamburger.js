import { GiHamburgerMenu } from "react-icons/gi";
import { RiCloseLine } from "react-icons/ri";
import classes from "./hamburger.module.css";

function Hamburger(props) {
  return (
    <div className={classes.hamburger}>
      <div onClick={props.navLinkHandler}>
        {props.showNavLinks ? <RiCloseLine /> : <GiHamburgerMenu />}
      </div>
    </div>
  );
}

export default Hamburger;
