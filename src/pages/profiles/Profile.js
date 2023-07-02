import React from "react";
import styles from "../../styles/Profile.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { Button } from "react-bootstrap";
import { useSetProfileData } from "../../contexts/ProfileDataContext";

const Profile = (props) => {
  const { profile, mobile, imageSize = 55 } = props;
  const { id, subscribing_id, image, owner } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const { handleSubscribe, handleUnsubscribe } = useSetProfileData();

  // Component for rendering a user profile.
  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} alt="Profile Avatar" />
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>
        <strong>{owner}</strong>
      </div>
      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {!mobile &&
          currentUser &&
          !is_owner &&
          (subscribing_id ? (
            <Button
              className={styles.UnsubButton}
              onClick={() => handleUnsubscribe(profile)}
            >
              Unsubscribe
            </Button>
          ) : (
            <Button
              className={styles.SubButton}
              onClick={() => handleSubscribe(profile)}
            >
              Subscribe
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Profile;
