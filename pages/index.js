import { MongoClient } from "mongodb";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import classes from "./home.module.css";

function Home(props) {
  const descriptiondata = JSON.parse(props.data);

  return (
    <section className={classes.homepage}>
      <div className={classes.carouselContainer}>
        <Carousel
          interval={5000}
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showArrows={true}
        >
          <div>
            <img src="/images/carousel1.jpg" alt="image1" />
            <p className="legend">Techonsolutions</p>
          </div>
          <div>
            <img src="/images/carousel2.jpg" alt="image2" />
            <p className="legend">We offer IT services in Kenya</p>
          </div>
          <div>
            <img src="/images/carousel3.jpg" alt="image3" />
            <p className="legend">
              Networking | Consultancy | Cybersecurity | Web development | Cloud
              computing | IT Support
            </p>
          </div>
          <div>
            <img src="/images/carousel4.jpg" alt="image4" />
            <p className="legend">
              techonsolutions@yahoo.com | +254705933595 | Social media:
              @techonsolns
            </p>
          </div>
        </Carousel>
      </div>
        <hr />
      <div className={classes.descriptionContainer}>
            <img src="/images/carousel1.jpg" alt="New Image" className={classes.image} />
           {descriptiondata.map((item) => (
          <p key={item._id}>{item.description}</p>
        ))}
      </div>
    </section>
  );
}

export async function getStaticProps(context) {
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
