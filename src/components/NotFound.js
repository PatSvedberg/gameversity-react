import React from "react";
import NoResults from "../assets/no-results.png";
import styles from "../styles/NotFound.module.css";
import Asset from "./Asset";

// Component for rendering a not found message
const NotFound = () => {
  return (
    // Using the Asset component to render an image and a message
    <div className={styles.NotFound}>
      <Asset
        src={NoResults}
        message={`Sorry, the page you're looking for doesn't exist`}
      />
    </div>
  );
};

export default NotFound;
