import Image from "next/image";
import Link from "next/link";
import classes from "./service.module.css";

function Service(props) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div className={classes.service}>
      <h2>{capitalizeFirstLetter(props.serviceitem.service)}</h2>
      <div className={classes.content}>
        <Image
          className={classes.serviceImage}
          src={`/images/${props.serviceitem.service}.jpg`}
          alt="an image showing service"
          width={600}
          height={400}
          objectFit="cover"
          objectPosition="center"
        />
        <p>{props.serviceitem.description.slice(0, 200)}  [Read more...]</p>
      </div>
      <div className={classes.quote}>
        <Link href={"/quote"}>
          <a>
            <h2>Get a Quote</h2>
          </a>
        </Link>
      </div>
    </div>
  );
}
export default Service;

