import { Fragment, useRef, useContext } from "react";
import { MongoClient } from "mongodb";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { BsTelephone } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { BsInstagram, BsLinkedin, BsFacebook } from "react-icons/bs";
import {FaXTwitter} from 'react-icons/fa6';
import { RiDeleteBin6Line } from "react-icons/ri";
import NotificationContext from "../store/notification-context";
import classes from "./contacts.module.css";

async function sendMessageData(details) {
  const response = await fetch("api/contact", {
    method: "POST",
    body: JSON.stringify(details),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!!");
  }

  return data;
}

async function deleteMessage(idreceived) {
  const body = { id: idreceived };
  const response = await fetch("api/contact", {
    method: "DELETE",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!!");
  }

  return data;
}

function Contacts(props) {
  const storedMessages = JSON.parse(props.messagedetailsdata);

  const { data: session } = useSession();

  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const router = useRouter();

  const notificationCtx = useContext(NotificationContext);

  async function submitHandler(event) {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredMessage = messageRef.current.value;

    const messageDetails = {
      name: enteredName,
      email: enteredEmail,
      message: enteredMessage,
    };

    try {
      const data = await sendMessageData(messageDetails);

      notificationCtx.showNotification({
        title: "Success",
        message: data.message,
        status: "success",
      });
    } catch (error) {
      notificationCtx.showNotification({
        title: "Failed",
        message: error.message,
        status: "error",
      });
    }

    nameRef.current.value = "";
    emailRef.current.value = "";
    messageRef.current.value = "";
    router.push("/");
  }

  async function deleteMessageHandler(id) {
    try {
      const data = await deleteMessage(id);

      notificationCtx.showNotification({
        title: "Success",
        message: data.message,
        status: "success",
      });
    } catch (error) {
      notificationCtx.showNotification({
        title: "Failed",
        message: error.message,
        status: "error",
      });
    }
  }

  return (
    <Fragment>
      <section>
        <div className={classes.contact}>
          <div className={classes.title}>
            <h2>Contact Us</h2>
          </div>
          <div className={classes.contacts}>
            <div className={classes.phone}>
              <BsTelephone /> <p>+254 113 270 070</p>
            </div>
            <div className={classes.email}>
              <FiMail />
              <p>techonsolutions@yahoo.com</p>
            </div>
            <div className={classes.email}>
              <IoLocationOutline />
              <p>Nairobi, Kenya</p>
            </div>
          </div>

          <div className={classes.social}>
            <Link href="https://twitter.com/techonsolns">
              <a>
                <FaXTwitter />
              </a>
            </Link>
            <Link href="https://www.linkedin.com/company/techon-solutions">
              <a>
                <BsLinkedin />
              </a>
            </Link>
            <Link href="https://www.instagram.com/techonsolns">
              <a>
                <BsInstagram />
              </a>
            </Link>
            <Link href="https://www.facebook.com/techonsolns">
              <a>
                <BsFacebook />
              </a>
            </Link>
          </div>
          <h3>Leave a Message</h3>
          <div className={classes.message}>
            <form onSubmit={submitHandler}>
              <div className={classes.control}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" required ref={nameRef} placeholder="Your Name" />
              </div>
              <div className={classes.control}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" required ref={emailRef} placeholder="example@mail.com" />
              </div>
              <div className={classes.control}>
                <label htmlFor="message">Message</label>
                <textarea
                  rows="5"
                  id="message"
                  required
                  ref={messageRef}
                  placeholder="We will provide feedback at our earliest convenience"
                  maxLength={150}
                ></textarea>
              </div>
              <button className={classes.btn}>Send</button>
            </form>
          </div>
        </div>
      </section>
      {session && (
        <section className={classes.messages}>
          <h3>Messages</h3>

          {storedMessages.map((message) => (
            <div className={classes.details} key={message._id}>
              <div className={classes.detail}>
                <h4>{`${message.name} (${message.email})`}</h4>
              </div>
              <div className={classes.detail}>{message.message}</div>
              <div
                className={classes.deletebtn}
                onClick={() => deleteMessageHandler(message._id)}
              >
                <RiDeleteBin6Line />
              </div>
            </div>
          ))}
        </section>
      )}
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.ibpnt47.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(connectionString);

  const db = client.db();

  const messagedetailsarray = await db
    .collection("messagedetails")
    .find()
    .toArray();

  const messageDetails = JSON.stringify(messagedetailsarray);

  client.close();

  return {
    props: {
      messagedetailsdata: messageDetails,
    },
    revalidate: 60,
  };
}

export default Contacts;
