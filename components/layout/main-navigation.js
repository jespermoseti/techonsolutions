import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Logo from "./logo";
import Hamburger from "./hamburger";
import Overlay from "./overlay";
import { useSession, signIn, signOut } from "next-auth/react";
import classes from "./main-navigation.module.css";

function MainNavigation() {
  const [showNavLinks, setShowNavLinks] = useState(false);

  const { data: session } = useSession();

  const router = useRouter();

  function navLinkHandler() {
    setShowNavLinks((prevState) => !prevState);
  }

  return (
    <header className={classes.header}>
      <div className={classes.headContent}>
        <div className={classes.headItems}>
          <Link href="/">
            <a onClick={showNavLinks && navLinkHandler}>
              <Logo />
            </a>
          </Link>
          <Hamburger
            showNavLinks={showNavLinks}
            navLinkHandler={navLinkHandler}
          />
        </div>
        <nav className={showNavLinks ? classes.nav : classes.hideNav}>
          <ul>
            <li onClick={showNavLinks && navLinkHandler}>
              <Link href={"/about"}>About</Link>
            </li>
            <li onClick={showNavLinks && navLinkHandler}>
              <Link href={"/services"}>Services</Link>
            </li>
            {session && (
              <li onClick={showNavLinks && navLinkHandler}>
                <Link href={"/dashboard"}>Dashboard</Link>
              </li>
            )}
            <li onClick={showNavLinks && navLinkHandler}>
              <Link href={""}>Shop</Link>
            </li>
            <li onClick={showNavLinks && navLinkHandler}>
              <Link href={"https://blog.techonsolutions.com/"}>Blog</Link>
            </li>
            <li onClick={showNavLinks && navLinkHandler}>
              <Link href={"/contacts"}>Contacts</Link>
            </li>
            <li onClick={showNavLinks && navLinkHandler}>
              <button
                className={classes.loginBtn}
                onClick={session ? () => signOut() : () => router.push("/auth")}
              >
                {session ? "LogOut" : "Login"}
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {showNavLinks ? <Overlay navLinkHandler={navLinkHandler} /> : ""}
    </header>
  );
}
export default MainNavigation;
