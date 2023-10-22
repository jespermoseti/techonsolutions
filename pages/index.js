import { MongoClient } from "mongodb";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import classes from "./home.module.css";

function Home(props) {
  const descriptiondata = JSON.parse(props.data);
  const hrStyle = {
    borderTop: "0.5rem solid #333", // Change the color and thickness as needed
    borderRadius: "50%",
    width: "100%",
    margin: "1rem 0", // Add margin above and below the horizontal rule
  };

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
        <hr style={hrStyle} />
      <div className={classes.descriptionContainer}>
            <img src="/images/carousel1.jpg" alt="New Image" className={classes.image} />
            <h1>Welcome to TechonSolutions – Your Trusted IT Partner</h1>
        <p>
          At TechonSolutions, we are your one-stop solution for a wide spectrum
          of IT services, serving clients not just in Nairobi but across the
          globe. With a strong commitment to excellence, we offer a
          comprehensive range of IT services designed to empower businesses and
          individuals with cutting-edge technology.
        </p>
        <p>
          <h3>Why Choose Us?</h3>
        </p>
        <ul>
          <li>
            <strong>A World of Services:</strong> TechonSolutions is your
            gateway to a vast array of IT services. From Nairobi to New York,
            our team is ready to serve you with services including:
            <ul>
              <li><p>Networking: Streamline your connectivity and ensure
              seamless communication within your organization.</p></li>
              <li><p>Installations: Whether it is setting up DSTV or installing
              an efficient air conditioning system, we have got you covered.</p></li>
              <li><p>Web Development: From personal blogs to e-commerce
              websites, we create digital experiences that captivate and
              convert.</p></li>
              <li><p>IT Consultancy: Our experts provide strategic guidance to
              keep your business on the cutting edge.</p></li>
              <li><p>Software Development: Custom solutions, including Point of
              Sale, School Management, and Sacco Management software, tailored to
              meet your unique needs.</p></li>
              <li><p>Cloud Computing: Harness the power of AWS, Microsoft Azure,
              and Google Cloud for flexible, scalable, and secure cloud solutions.</p></li>
              <li><p>Graphics Design: Elevate your brand with eye-catching designs
              that leave a lasting impression.</p></li>
              <li><p>Odoo Applications: Deploy Odoo Enterprise or Community
              applications seamlessly to enhance your business processes.</p></li>
              <li><p>CCTV Surveillance: Protect your assets with state-of-the-art
              CCTV systems and access control solutions.</p></li>
              <li><p>Cybersecurity: Stay one step ahead of cyber threats with our
              robust security solutions.</p></li>
            </ul>
          </li>
          <li>
            <strong>Global Reach, Local Expertise:</strong> Although based in
            Nairobi, we have a global perspective. Our solutions transcend
            borders, and we work with clients worldwide to transform their IT
            landscape.
          </li>
          <li>
            <strong>Customer-Centric Approach:</strong> Our commitment to
            understanding your unique needs, goals, and challenges ensures that
            we deliver tailored, customer-focused solutions.
          </li>
        </ul>
        <p>
          <strong>Ready to Transform Your IT Landscape?</strong>
        </p>
        <p>
          Whether you are a startup, a multinational corporation, or an
          individual seeking IT solutions, TechonSolutions is here to make your
          vision a reality. <strong>Contact us today</strong> for a consultation, and let us embark
          on a journey of innovation and growth together.
        </p>
  
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
