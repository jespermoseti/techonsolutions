import Link from "next/link";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { BsInstagram, BsLinkedin, BsTwitter, BsFacebook } from "react-icons/bs";
import classes from "./footer.module.css";

function Footer() {
  const d = new Date();
  let Year = d.getFullYear();

  const router = useRouter();

  function scrollHandler() {
    const currentPath = `${router.pathname}`;
    router.push(currentPath);
  }

  return (
    <Fragment>
      <div className={classes.footer}>
        <div className={classes.description}>
          <h4>Techonsolutions</h4>
          <p>At TechonSolutions, we are dedicated to delivering cutting-edge IT solutions that empower businesses and individuals alike. With a passion for innovation, a commitment to cybersecurity, and a wealth of technical expertise, we stand as your trusted partner in the ever-evolving world of technology. Whether you're a startup seeking a digital edge or an established organization looking to optimize your IT infrastructure, we're here to elevate your possibilities and transform your IT landscape.</p>
        </div>
        <div className={classes.navlinks}>
          <ul>
            <li>
              <Link href={"/about"}>About</Link>
            </li>
            <li>
              <Link href={"/services"}>Services</Link>
            </li>
            <li>
              <Link href={""}>Shop</Link>
            </li>
            <li>
              <Link href={""}>Blog</Link>
            </li>
            <li>
              <Link href={"/contacts"}>Contacts</Link>
            </li>
          </ul>
        </div>
        <div className={classes.socialIcons}>
          <Link href="https://www.facebook.com/techonsolns">
            <a>
              <BsFacebook />
            </a>
          </Link>
          <Link href="https://www.instagram.com/techonsolns">
            <a>
              <BsInstagram />
            </a>
          </Link>
          <Link href="https://twitter.com/techonsolns">
            <a>
              <BsTwitter />
            </a>
          </Link>
          <Link href="https://www.linkedin.com/company/techon-solutions">
            <a>
              <BsLinkedin />
            </a>
          </Link>
        </div>
        <div className={classes.scrollUp} onClick={scrollHandler}>
          <BsFillArrowUpCircleFill />
        </div>
      </div>
      <div className={classes.legal}>© Techonsolutions @{Year}</div>
    </Fragment>
  );
}
export default Footer;
