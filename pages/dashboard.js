import { Fragment, useRef, useState, useContext } from "react";
import { MongoClient } from "mongodb";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
import classes from "./dashboard.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import NotificationContext from "../store/notification-context";
import {
  sendBriefDescriptionData,
  sendAboutData,
  sendServicesData,
  deleteDescription,
  deleteAbout,
  deleteService,
} from "../helpers/functions";

function Dashboard(props) {
  const [dashboardiItem, setDashboardItem] = useState("description");
  const storeddescriptions = JSON.parse(props.descriptiondata);
  const storedabouts = JSON.parse(props.aboutdata);
  const storedservices = JSON.parse(props.servicesdata);

  const descriptionInputRef = useRef();
  const aboutInputRef = useRef();
  const serviceInputRef = useRef();
  const serviceDescriptionInputRef = useRef();

  //const { data: session } = useSession();
  
  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.replace("/auth");
        }
      });
     }, []);

  const router = useRouter();

  const notificationCtx = useContext(NotificationContext);

  async function briefDescriptionDataHandler(event) {
    event.preventDefault();

    //optional:add client-side validation

    const enteredDescription = descriptionInputRef.current.value;

    try {
      const data = await sendBriefDescriptionData({
        description: enteredDescription,
      });
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
    descriptionInputRef.current.value = "";
    router.push("/dashboard");
  }

  async function aboutDataHandler(event) {
    event.preventDefault();

    //optional:add client-side validation

    const enteredAbout = aboutInputRef.current.value;

    try {
      const data = await sendAboutData({
        about: enteredAbout,
      });
      notificationCtx.showNotification({
        title: "Success",
        message: data.message,
        status: "success",
      });
    } catch (error) {
      notificationCtx.showNotification({
        title: "Failed",
        message: error.message,
        status: "danger",
      });
    }
    aboutInputRef.current.value = "";
    router.push("/dashboard");
  }

  async function servicesDataHandler(event) {
    event.preventDefault();

    //optional:add client-side validation

    const enteredServiceDescription = serviceDescriptionInputRef.current.value;
    const enteredService = serviceInputRef.current.value;

    try {
      const data = await sendServicesData({
        description: enteredServiceDescription,
        service: enteredService,
      });
      notificationCtx.showNotification({
        title: "Success",
        message: data.message,
        status: "success",
      });
    } catch (error) {
      notificationCtx.showNotification({
        title: "Failed",
        message: error.message,
        status: "danger",
      });
    }
    serviceDescriptionInputRef.current.value = "";
    serviceInputRef.current.value = "";
    router.push("/dashboard");
  }

  async function deleteDescriptionDataHandler(id) {
    try {
      const data = await deleteDescription(id);
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
    router.push("/dashboard");
  }

  async function deleteAboutDataHandler(id) {
    try {
      const data = await deleteAbout(id);
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
    router.push("/dashboard");
  }

  async function deleteServiceDataHandler(id) {
    try {
      const data = await deleteService(id);
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
    router.push("/dashboard");
  }

  return (
    <section className={classes.dashboard}>
      <div className={classes.selectors}>
        <div
          className={classes.selectitem}
          onClick={() => setDashboardItem("description")}
        >
          Description
        </div>
        <div
          className={classes.selectitem}
          onClick={() => setDashboardItem("about")}
        >
          About
        </div>
        <div
          className={classes.selectitem}
          onClick={() => setDashboardItem("services")}
        >
          Services
        </div>
      </div>
      {dashboardiItem === "description" && (
        <Fragment>
          <form className={classes.form} onSubmit={briefDescriptionDataHandler}>
            <div className={classes.controls}>
              <div className={classes.control}>
                <label htmlFor="description">Brief description</label>
                <textarea
                  rows="5"
                  id="description"
                  ref={descriptionInputRef}
                  required
                />
              </div>
            </div>

            <button className={classes.btn}>Submit</button>
          </form>
          <section className={classes.description}>
            <h3>Description Details</h3>
            {storeddescriptions.map((description) => (
              <div className={classes.details} key={description._id}>
                <div className={classes.detail}>{description.description}</div>
                <div
                  className={classes.deletebtn}
                  onClick={() => (
                    deleteDescriptionDataHandler(description._id),
                    router.push("/dashboard")
                  )}
                >
                  <RiDeleteBin6Line />
                </div>
              </div>
            ))}
          </section>
        </Fragment>
      )}
      {dashboardiItem === "about" && (
        <Fragment>
          <form onSubmit={aboutDataHandler}>
            <div className={classes.controls}>
              <div className={classes.control}>
                <label htmlFor="description">About</label>
                <textarea
                  rows="10"
                  id="description"
                  ref={aboutInputRef}
                  required
                />
              </div>
            </div>
            <button className={classes.btn}>Submit</button>
          </form>
          <section className={classes.description}>
            <h3>About Details</h3>

            {storedabouts.map((about) => (
              <div className={classes.details} key={about._id}>
                <div className={classes.detail}>{about.about}</div>
                <div
                  className={classes.deletebtn}
                  onClick={() => (
                    deleteAboutDataHandler(about._id), router.push("/dashboard")
                  )}
                >
                  <RiDeleteBin6Line />
                </div>
              </div>
            ))}
          </section>
        </Fragment>
      )}
      {dashboardiItem === "services" && (
        <Fragment>
          <form className={classes.form} onSubmit={servicesDataHandler}>
            <div className={classes.control}>
              <label htmlFor="title">Service</label>
              <input type="name" id="title" required ref={serviceInputRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor="description">Description</label>
              <textarea
                rows="10"
                id="description"
                required
                ref={serviceDescriptionInputRef}
              />
            </div>
            <button className={classes.btn}>Add</button>
          </form>
          <section className={classes.description}>
            <h3>Services Details</h3>

            {storedservices.map((service) => (
              <div key={service._id}>
                <div className={classes.detail}>
                  <h4>{service.service}</h4>
                </div>
                <div className={classes.details}>
                  <div className={classes.detail}>{service.description}</div>
                  <div
                    className={classes.deletebtn}
                    onClick={() => (
                      deleteServiceDataHandler(service._id),
                      router.push("/dashboard")
                    )}
                  >
                    <RiDeleteBin6Line />
                  </div>
                </div>
              </div>
            ))}
          </section>
        </Fragment>
      )}
    </section>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });//this method is replaced by unstable_getServerSession method

  //if (!session) {
    //return {
      //redirect: {
        //destination: "/auth",
        //permanent: false,
      //},
    //};
  //}

  // const client = await MongoClient.connect(
  //   "mongodb+srv://<username>:<password>@<clustername>.ibpnt47.mongodb.net/<database>?retryWrites=true&w=majority"
  // );

  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.ibpnt47.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(connectionString);

  const db = client.db();

  const descriptionarray = await db
    .collection("descriptiondetails")
    .find()
    .toArray();

  const aboutarray = await db.collection("aboutdetails").find().toArray();

  const servicesarray = await db.collection("servicesdetails").find().toArray();

  const description = JSON.stringify(descriptionarray);

  const about = JSON.stringify(aboutarray);

  const services = JSON.stringify(servicesarray);

  client.close();

  return {
    props: {
      session: session,
      descriptiondata: description,
      aboutdata: about,
      servicesdata: services,
    },
  };
}

export default Dashboard;
