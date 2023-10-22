import { MongoClient } from "mongodb";
import classes from "./about.module.css";

function About(props) {
  const aboutdata = JSON.parse(props.data);
  return (
    <div className={classes.aboutpage}>
      <h1>About TechonSolutions</h1>
        <p>
          At TechonSolutions, we are your trusted IT partner, dedicated to
          providing a wide range of IT solutions that empower businesses and
          individuals with cutting-edge technology. Our commitment to excellence
          and customer-centric approach set us apart.
        </p>

        <p>
          <h3>Why Choose Us?</h3>
        </p>
        <ul>
          <li>
            <p>
              <strong>Expertise:</strong> Our team of skilled technicians and IT
              experts brings years of experience to the table, ensuring your
              IT needs are met with precision and professionalism.
            </p>
          </li>
          <li>
            <p>
              <strong>Comprehensive Services:</strong> From networking and
              web development to cybersecurity and software solutions, we offer
              a wide spectrum of services designed to streamline your IT
              operations.
            </p>
          </li>
          <li>
            <p>
              <strong>Global Perspective:</strong> While we are based in
              Nairobi, our vision extends globally. We work with clients
              worldwide to transform their IT landscape.
            </p>
          </li>
          <li>
            <p>
              <strong>Customer-Focused:</strong> Your unique needs and goals are
              at the forefront of our approach. We work closely with you to
              deliver tailored solutions that fit your business or personal IT
              requirements.
            </p>
          </li>
          <li>
            <p>
              <strong>Swift Computer Repairs:</strong> We also offer
              reliable computer repair services to get you back to work
              hassle-free. Do not let computer problems hold you back.
            </p>
          </li>
        </ul>
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
