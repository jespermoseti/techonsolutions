import { useContext } from "react";
import Footer from "./footer";
import MainNavigation from "./main-navigation";
import Notification from "../ui/notification";
import NotificationContext from "../../store/notification-context";
import classes from "./layout.module.css";

function Layout(props) {
  const NotificationCtx = useContext(NotificationContext);
  const activeNotification = NotificationCtx.notification;
  return (
    <div className={classes.layout}>
      <MainNavigation />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
      <Footer />
    </div>
  );
}

export default Layout;
