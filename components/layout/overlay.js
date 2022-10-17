import ReactDOM from "react-dom";
import classes from "./overlay.module.css";

function Overlay(props) {
  return ReactDOM.createPortal(
    <div onClick={props.navLinkHandler} className={classes.overlay}></div>,
    document.getElementById("overlay")
  );
}
export default Overlay;
