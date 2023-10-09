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
          width={200}
          height={100}
          objectFit="cover"
          objectPosition="center"
        />
        <p>{props.serviceitem.description.slice(0, 200)}...</p>
      </div>
    </div>
  );
}
export default Service;
