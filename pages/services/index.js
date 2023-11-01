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
  // const client = await MongoClient.connect(
  //   "mongodb+srv://<username>:<password>@<clustername>.ibpnt47.mongodb.net/<database>?retryWrites=true&w=majority"
  // );

  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.ibpnt47.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(connectionString);

  const db = client.db();

  const dataarray = await db.collection("servicesdetails").find().toArray();

  const array = JSON.stringify(dataarray);

  client.close();

  return {
    props: {
      data: array,
    },
    revalidate: 60,
  };
}

export default Services;
