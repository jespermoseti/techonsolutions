import { MongoClient } from "mongodb";
import { useRouter } from "next/router";
import Link from "next/link";
import Service from "../../components/servicepage/service";
import classes from "./services.module.css";

function Services(props) {
  const servicesdata = JSON.parse(props.data);

  return (
    <div className={classes.servicespage}>
      <div className={classes.stickyBackground}></div> {/* Sticky background image */}
      {servicesdata.map((serviceitem) => (
        <div key={serviceitem._id} className={classes.service}>
          <Link href={`/services/${serviceitem.service}`.toLowerCase()}>
            <a>
              <Service serviceitem={serviceitem} />
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps(context) {
  // MongoDB data fetching code
}

export default Services;
