import React from "react";
import styles from "../../styles/TutorialFeedCard.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import btnStyles from "../../styles/Button.module.css";

// Component for rendering a tutorial card for the feed
const Tutorial = (props) => {
  const {
    title,
    image,
    owner,
    profile_id,
    profile_image,
    created_at,
    updated_at,
    id,
    description,
    language,
    engine,
    engine_version,
    theme,
    like_id,
    comments_count,
    likes_count,
    setTutorials,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  /**
   * Handles the like action for the tutorial.
   * Sends a POST request to create a new like for the tutorial.
   * Updates the tutorials state with the updated like count and like ID.
   */
  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { tutorial: id });
      setTutorials((prevTutorials) => ({
        ...prevTutorials,
        results: prevTutorials.results.map((tutorial) => {
          return tutorial.id === id
            ? {
                ...tutorial,
                likes_count: tutorial.likes_count + 1,
                like_id: data.id,
              }
            : tutorial;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  /**
   * Handles the unlike action for the tutorial.
   * Sends a DELETE request to delete the like associated with the tutorial.
   * Updates the tutorials state with the updated like count and null like ID.
   */
  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setTutorials((prevTutorials) => ({
        ...prevTutorials,
        results: prevTutorials.results.map((tutorial) => {
          return tutorial.id === id
            ? {
                ...tutorial,
                likes_count: tutorial.likes_count - 1,
                like_id: null,
              }
            : tutorial;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <div className={styles.Full}>
      <header className={styles.TopDiv}>
        <div className={styles.Avatar}>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
        </div>
        <h2>{title}</h2>
        <h5 className={styles.DescText}>{description}</h5>
      </header>
      <Card className={styles.CustomCard}>
        <small className="DateText">
          Created at: {new Date(created_at).toLocaleDateString()}
        </small>
      </Card>
      <Card className={styles.CustomCard}>
        <small className="DateText">
          Last updated: {new Date(updated_at).toLocaleDateString()}
        </small>
      </Card>
      <section className={styles.TutorialContainer}>
        <Card className={styles.CustomCard}>
          <Card.Body>
            <div className={styles.TutorialRight}>
              <div className={styles.ImageContainer}>
                <Link to={`/profiles/${profile_id}`}>
                  <img src={image} className={styles.Image} alt="Tutorial" />
                </Link>
              </div>
              <div className={styles.LikesCommentInfo}>
                <div className={styles.LikesCommentDiv}>
                  {is_owner ? (
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip>You can&apos;t like your own post!</Tooltip>
                      }
                    >
                      <i className="far fa-heart" aria-label="Like" />
                    </OverlayTrigger>
                  ) : like_id ? (
                    <span onClick={handleUnlike}>
                      <i
                        className={`fas fa-heart ${styles.Heart}`}
                        aria-label="Like"
                      />
                    </span>
                  ) : currentUser ? (
                    <span onClick={handleLike}>
                      <i
                        className={`far fa-heart ${styles.HeartOutline}`}
                        aria-label="Like"
                      />
                    </span>
                  ) : (
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Log in to like posts!</Tooltip>}
                    >
                      <i className="far fa-heart" aria-label="Like" />
                    </OverlayTrigger>
                  )}

                  {likes_count}
                </div>
                <div className={styles.LikesCommentDiv}>
                  <Link to={`/tutorials/${id}`}>
                    <i className="far fa-comments" aria-label="Comments" />
                    <span className="visually-hidden">{comments_count}</span>
                  </Link>
                </div>

                <Card className={styles.CustomCard}>
                  <Card.Body>
                    <Media className={styles.TutorialInfo}>
                      <div className={styles.InfoDiv}>
                        <div className={styles.InfoContainer}>
                          <p>
                            <strong>Engine: </strong>
                            {engine}
                          </p>
                          <p>
                            <strong>Engine version: </strong>
                            {engine_version}
                          </p>
                        </div>
                        <div className={styles.InfoContainer}>
                          <p>
                            <strong>Language: </strong>
                            {language}
                          </p>
                          <p>
                            <strong>Theme: </strong>
                            {theme}
                          </p>
                        </div>
                      </div>
                    </Media>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </Card.Body>
        </Card>
      </section>
      <div className={styles.BottomCenter}>
        <Link to={`/tutorials/${id}`}>
          <button className={`${btnStyles.Button} ${btnStyles.Orange}`} id={id}>
            View Tutorial
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Tutorial;
