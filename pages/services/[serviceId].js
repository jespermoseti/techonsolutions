import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { MongoClient } from "mongodb";
import { useRouter } from "next/router";
import classes from "./service.module.css";

function Service(props) {
  const router = useRouter();

  const services = JSON.parse(props.services);

  const serviceid = router.query.serviceId;

  const filteredservice = services.filter(
    (service) => service.service.toLowerCase() === serviceid
  );

  // console.log(router.pathname);
  // console.log(router.query);

  return (
    <Fragment>
      {filteredservice.map((filteredservice) => (
        <div className={classes.service} key={filteredservice._id}>
          <h2>{filteredservice.service}</h2>
          <Image
            className={classes.serviceImage}
            src={`/images/${filteredservice.service}.jpg`}
            alt="an image showing service"
            width={600}
            height={400}
            objectFit="cover"
            objectPosition="center"
          />
          <div className={classes.description}>
            <p>{filteredservice.description}</p>
          </div>
          <div className={classes.quote}>
            <Link href={"/quote"}>
              <a>
                <h2>Get a Quote</h2>
              </a>
            </Link>
          </div>
        </div>
      ))}
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.ibpnt47.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(connectionString);

  const db = client.db();

  const servicesarray = await db.collection("servicesdetails").find().toArray();
  const services = JSON.stringify(servicesarray);

  return {
    props: {
      services: services,
    },
  };
}

export default Service;
