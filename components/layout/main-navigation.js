import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo"; // You can replace this with your own Logo component
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./main-navigation.module.css";

function MainNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/">
          <a className={styles.logo}>
            <Logo /> {/* Replace with your logo */}
          </a>
        </Link>
        <div
          className={`${styles.menuIcon} ${isMenuOpen && styles.menuOpen}`}
          onClick={toggleMenu}
        >
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>
        <ul className={`${styles.menu} ${isMenuOpen && styles.menuOpen}`}>
          <li>
            <Link href="/about">
              <a onClick={closeMenu}>About</a>
            </Link>
          </li>
          <li>
            <Link href="/services">
              <a onClick={closeMenu}>Services</a>
            </Link>
          </li>
          {session && (
            <li>
              <Link href="/dashboard">
                <a onClick={closeMenu}>Dashboard</a>
              </Link>
            </li>
          )}
          <li>
            <Link href="/shop">
              <a onClick={closeMenu}>Shop</a>
            </Link>
          </li>
          <li>
            <Link href="https://blog.techonsolutions.com/">
              <a onClick={closeMenu}>Blog</a>
            </Link>
          </li>
          <li>
            <Link href="/contacts">
              <a onClick={closeMenu}>Contacts</a>
            </Link>
          </li>
          <li>
            <button
              className={styles.loginBtn}
              onClick={session ? () => signOut() : () => signIn("your-provider")}
            >
              {session ? "Log Out" : "Log In"}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default MainNavigation;
