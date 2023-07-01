import React from "react";
import styles from "../styles/Avatar.module.css";

// Avatar component for displaying user avatar and optional text
const Avatar = ({ src, height = 45, text }) => {
  return (
    <span>
      <img
        className={styles.Avatar}
        src={src} // source of the avatar image
        height={height} // height of the avatar, default is 45
        width={height} // width of the avatar, same as height to keep the image square
        alt="avatar" // alt text for the image
      />
      {text}
    </span>
  );
};

export default Avatar;
