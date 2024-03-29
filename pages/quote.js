import { Fragment, useRef, useContext } from "react";
import { MongoClient } from "mongodb";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import NotificationContext from "../store/notification-context";
import { RiDeleteBin6Line } from "react-icons/ri";
import classes from "./quote.module.css";

async function sendQuoteData(details) {
  const response = await fetch("api/quote", {
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

async function deleteQuote(idreceived) {
  const body = { id: idreceived };
  const response = await fetch("api/quote", {
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

function Quote(props) {
  const storedQuotations = JSON.parse(props.quotationdetailsdata);

  const { data: session } = useSession();

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const companyRef = useRef();
  const descriptionRef = useRef();

  const router = useRouter();

  const notificationCtx = useContext(NotificationContext);

  async function submitHandler(event) {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredPhone = phoneRef.current.value;
    const enteredCompany = companyRef.current.value;
    const enteredDescription = descriptionRef.current.value;

    const quoteDetails = {
      name: enteredName,
      email: enteredEmail,
      phone: enteredPhone,
      company: enteredCompany,
      description: enteredDescription,
    };

    try {
      const data = await sendQuoteData(quoteDetails);

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
    phoneRef.current.value = "";
    companyRef.current.value = "";
    descriptionRef.current.value = "";
    router.push("/");
  }

  async function deleteQuoteHandler(id) {
    try {
      const data = await deleteQuote(id);

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
      <div className={classes.backgroundImage}></div>

      <section>
        <div className={classes.quote}>
          <h3>Get a quote</h3>
          <div className={classes.message}>
            <form onSubmit={submitHandler}>
              <div className={classes.control}>
                <label htmlFor="title">Name</label>
                <input type="name" id="title" required ref={nameRef} placeholder="Your Name" />
              </div>
              <div className={classes.control}>
                <label htmlFor="title">Email</label>
                <input type="email" id="title" required ref={emailRef} placeholder="example@mail.com" />
              </div>
              <div className={classes.control}>
                <label htmlFor="phone">Phone (+254 712345678)</label>
                <input type="name" id="phone" required ref={phoneRef} placeholder="+254 712345678" />
              </div>
              <div className={classes.control}>
                <label htmlFor="company">Company name (optional)</label>
                <input type="name" id="company" ref={companyRef} placeholder="Techon Solutions"/>
              </div>
              <div className={classes.control}>
                <label htmlFor="description">
                  What can we do for you? Include your project budget
                </label>
                <textarea
                  rows="10"
                  id="description"
                  required
                  ref={descriptionRef}
                  placeholder="How can we help you?"
                />
              </div>
              <button className={classes.btn}>Submit</button>
            </form>
            <div className={classes.information}>
              <h3>What is next?</h3>
              <p>You will get an email and a phone call from one of our representatives.</p>
              <p>You will get a time and cost estimation of your project.</p>
              <p>An in-person meeting will be organized for you.</p>
            </div>
            <h4>N:B - this is not a job application form. Kindly check our career page if any.</h4>
          </div>
        </div>
      </section>
      {session && (
        <section className={classes.messages}>
          <h3>Quotes</h3>

          {storedQuotations.map((quote) => (
            <div className={classes.details} key={quote._id}>
              <div className={classes.detail}>
                <h4>{`${quote.name}(${quote.company})`}</h4>
              </div>
              <div className={classes.detail}>
                <h4>{quote.email}</h4>
                <h4>{quote.phone}</h4>
                <p>{quote.description}</p>
              </div>
              <div
                className={classes.deletebtn}
                onClick={() => (deleteQuoteHandler(quote._id), router.push("/quote"))}
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
  const quotationdetailsarray = await db.collection("quotationdetails").find().toArray();
  const quotationDetails = JSON.stringify(quotationdetailsarray);
  client.close();

  return {
    props: {
      quotationdetailsdata: quotationDetails,
    },
    revalidate: 60,
  };
}

export default Quote;
