import { MongoClient } from "mongodb";
import classes from "./about.module.css";

function About(props) {
  const aboutdata = JSON.parse(props.data);
  return (
    <div className={classes.aboutpage}>
      {aboutdata.map((item) => (
        <p key={item._id}>{item.about}</p>
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

  const dataarray = await db.collection("aboutdetails").find().toArray();

  const array = JSON.stringify(dataarray);

  client.close();

  return {
    props: {
      data: array,
    },
    revalidate: 60,
  };
}

export default About;
