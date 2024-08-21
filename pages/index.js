import { MongoClient } from "mongodb";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css";
import classes from "./home.module.css";

function Home(props) {
  const descriptiondata = JSON.parse(props.data);
  /*horizontal rule styles*/
  const hrStyle = {
    borderTop: "0.5rem solid #333",
    borderRadius: "50%",
    width: "100%",
    margin: "1rem 0",
  };

  /*swipperjs constant*/
  const params = {
    preloadImages: false,
    autoplay: {
      delay: 4000
    },
    loop: true,
    watchSlidesProgress: true,
    speed: 2000,
    parallax: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true
    },
    height: '100%', // Make sure the carousel takes full height
  };

  return (
    <section className={classes.homepage}>
      <div className={classes.backgroundImage}></div>

      <div className={classes.carouselContainer}>

        <div className="slider">
        <Swiper {...params}>
          <div>
            <div className="content">
              <h1 data-swiper-parallax={-200}>Your Tech Journey Starts with TechonSolutions</h1>
              <p data-swiper-parallax={-400}>
                Your Path to Success: Our Cutting-Edge IT Solutions. We deliver solutions that empower your business.
              </p>
            </div>
            <div
              data-swiper-parallax={"23%"}
              className="slider-bg"
              style={{
                backgroundImage: `url('https://unsplash.com/photos/gray-and-black-laptop-computer-on-surface-Im7lZjxeLhg')`
              }}
            />
          </div>
          <div>
            <div className="content">
              <h1 data-swiper-parallax={-200}>Charting a New Course</h1>
              <p data-swiper-parallax={-400}>
                Let us sail uncharted waters together! TechonSolutions is your compass to 
                navigate the dynamic IT landscape, ensuring you stay ahead of the curve.
              </p>
            </div>
            <div
              data-swiper-parallax={"23%"}
              className="slider-bg"
              style={{
                backgroundImage: `url('https://unsplash.com/photos/a-macbook-with-lines-of-code-on-its-screen-on-a-busy-desk-m_HRfLhgABo')`
              }}
            />
          </div>
          <div>
            <div className="content">
              <h1 data-swiper-parallax={-200}>Unleash Your Potential</h1>
              <p data-swiper-parallax={-400}>
                TechonSolutions is your key to unlocking your full potential in the digital
                realm. Let us unleash the power of technology together.
              </p>
            </div>
            <div
              data-swiper-parallax={"23%"}
              className="slider-bg"
              style={{
                backgroundImage: `url('https://unsplash.com/photos/apple-macbook-beside-computer-mouse-on-table-9l_326FISzk')`
              }}
            />
          </div>
        </Swiper>
      </div>
       
      </div>
      <hr style={hrStyle} />
      <div className={classes.descriptionContainer}>
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
            <p>
              <strong>A World of Services:</strong> TechonSolutions is your
              gateway to a vast array of IT services. From Nairobi to New York,
              our team is ready to serve you with services including:
            </p>
            <ul>
              <li>
                <p>Networking: Streamline your connectivity and ensure seamless communication within your organization.</p>
              </li>
              <li>
                <p>Installations: Whether it is setting up DSTV or installing an efficient air conditioning system, we have got you covered.</p>
              </li>
              <li>
                <p>Web Development: From personal blogs to e-commerce websites, we create digital experiences that captivate and convert.</p>
              </li>
              <li>
                <p>IT Consultancy: Our experts provide strategic guidance to keep your business on the cutting edge.</p>
              </li>
              <li>
                <p>Software Development: Custom solutions, including Point of Sale, School Management, and Sacco Management software, tailored to meet your unique needs.</p>
              </li>
              <li>
                <p>Cloud Computing: Harness the power of AWS, Microsoft Azure, and Google Cloud for flexible, scalable, and secure cloud solutions.</p>
              </li>
              <li>
                <p>Graphics Design: Elevate your brand with eye-catching designs that leave a lasting impression.</p>
              </li>
              <li>
                <p>Odoo Applications: Deploy Odoo Enterprise or Community applications seamlessly to enhance your business processes.</p>
              </li>
              <li>
                <p>CCTV Surveillance: Protect your assets with state-of-the-art CCTV systems and access control solutions.</p>
              </li>
              <li>
                <p>Cybersecurity: Stay one step ahead of cyber threats with our robust security solutions.</p>
              </li>
              <li>
                <p>Computer Repairs: Swift and reliable computer repair services. Do not let computer problems hold you back; we are just a call away from getting you back to work, hassle-free.</p>
              </li>
            </ul>
          </li>
          <li>
            <p>
              <strong>Global Reach, Local Expertise:</strong> Although based in
              Nairobi, we have a global perspective. Our solutions transcend
              borders, and we work with clients worldwide to transform their IT
              landscape.
            </p>
          </li>
          <li>
            <p>
              <strong>Customer-Centric Approach:</strong> Our commitment to
              understanding your unique needs, goals, and challenges ensures that
              we deliver tailored, customer-focused solutions.
            </p>
          </li>
        </ul>
        <p>
          <strong>Ready to Transform Your IT Landscape?</strong>
        </p>
        <p>
          Whether you are a startup, a multinational corporation, or an
          individual seeking IT solutions, TechonSolutions is here to make your
          vision a reality. <strong>Contact us today</strong> for a consultation, and let us embark on a journey of innovation and growth together.
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
