import { MongoClient } from "mongodb";
import styles from "./about.module.css";

export default function About({ data }) {
  const aboutData = JSON.parse(data);

  return (
    <div className={styles.aboutpage}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1>About TechonSolutions</h1>
        <p>
          At TechonSolutions, we are your trusted IT partner, dedicated to
          providing a wide range of IT solutions that empower businesses and
          individuals with cutting-edge technology. Our commitment to excellence
          and a customer-centric approach set us apart.
        </p>

        <h3>Why Choose Us?</h3>
        <ul>
          <li>
            <p>
              <strong>Expertise:</strong> Our team of skilled technicians and IT
              experts bring years of experience to the table, ensuring your IT
              needs are met with precision and professionalism.
            </p>
          </li>
          <li>
            <p>
              <strong>Comprehensive Services:</strong> From networking and web
              development to cybersecurity and software solutions, we offer a
              wide spectrum of services designed to streamline your IT operations.
            </p>
          </li>
          <li>
            <p>
              <strong>Global Perspective:</strong> While we are based in Nairobi,
              our vision extends globally. We work with clients worldwide to
              transform their IT landscape.
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
              <strong>Swift Computer Repairs:</strong> We also offer reliable
              computer repair services to get you back to work hassle-free. Do not
              let computer problems hold you back.
            </p>
          </li>
        </ul>
        {aboutData.map((item) => (
          <p key={item._id}>{item.about}</p>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.ibpnt47.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

  const client = await MongoClient.connect(connectionString);
  const db = client.db();
  const dataArray = await db.collection("aboutdetails").find().toArray();
  const data = JSON.stringify(dataArray);
  client.close();

  return {
    props: {
      data,
    },
    revalidate: 60,
  };
}
