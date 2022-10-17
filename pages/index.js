import { MongoClient } from "mongodb";
import Image from "next/image";
import { Fragment } from "react";
import classes from "./home.module.css";

function Home(props) {
  const descriptiondata = JSON.parse(props.data);
  return (
    <section className={classes.homepage}>
      <div className={classes.videos}>
        <video
          autoPlay
          loop
          muted
          className={classes.video}
          style={{
            width: "100%",
            height: "100%",
            zIndex: "-1",
            borderRadius: "0.5rem",
          }}
        >
          <source src="/images/city.mp4" type="video/mp4" />
        </video>
      </div>
      {/* <Image
        className={classes.backgroundImage}
        src="/images/wallpaper.jpg"
        alt="an image showing jes"
        //layout="fill"
        width={600}
        height={400}
        objectFit="cover"
        objectPosition="center"
      /> */}
      {descriptiondata.map((item) => (
        <p key={item._id}>{item.description}</p>
      ))}
    </section>
  );
}

export async function getStaticProps(context) {
  // const client = await MongoClient.connect(
  //   "mongodb+srv://<username>:<password>@<clustername>.ibpnt47.mongodb.net/<database>?retryWrites=true&w=majority"
  // );

  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.ibpnt47.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(connectionString);

  const db = client.db();

  const dataarray = await db.collection("descriptiondetails").find().toArray();

  const array = JSON.stringify(dataarray);

  client.close();

  return {
    props: {
      data: array,
    },
    revalidate: 60,
  };
}
export default Home;
