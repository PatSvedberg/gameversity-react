import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Tutorial.module.css";
import Divider from "@mui/material/Divider";

const Comments = ({ comments }) => {
  return (
    <div className={styles.CommentsContainer}>
      <h6>Comments:</h6>
      {comments.map((comment, index) => (
        <div key={index} className={styles.Comment}>
          <p>{comment}</p>
        </div>
      ))}
    </div>
  );
};

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
    steps,
    like_id,
    currentUser,
    comments_count,
    likes_count,
  } = props;

  const is_owner = currentUser?.username === owner;
  const renderTooltip = (props) => (
    <Tooltip {...props}>Avatar tooltip example</Tooltip>
  );

  function renderHeartWithLikeCount(heartIcon) {
    return (
      <div>
        {heartIcon}
        <span>Likes: {likes_count}</span>
      </div>
    );
  }

  return (
    <div className={styles.Full}>
      <div className={styles.TopDiv}>
        <Link to={`/profiles/${profile_id}`}>
          <OverlayTrigger placement="top" overlay={renderTooltip}>
            <Avatar src={profile_image} height={55} />
          </OverlayTrigger>
        </Link>
        <h2>{title}</h2>
      </div>
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
      <div className={styles.TutorialContainer}>
        <Card className={styles.CustomCard}>
          <Card.Body>
            <Media className={styles.TutorialRight}>
              <div className={styles.ImageContainer}>
                <Link to={`/profiles/${profile_id}`}>
                  <img src={image} alt={Image} className={styles.Image} />
                </Link>
              </div>
              {is_owner
                ? renderHeartWithLikeCount(
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip>You can&apos;t like your own post!</Tooltip>
                      }
                    >
                      <i className="far fa-heart" />
                    </OverlayTrigger>
                  )
                : like_id
                ? renderHeartWithLikeCount(
                    <span onClick={() => {}}>
                      <i className={`fas fa-heart ${styles.Heart}`} />
                    </span>
                  )
                : currentUser
                ? renderHeartWithLikeCount(
                    <span onClick={() => {}}>
                      <i className={`far fa-heart ${styles.HeartOutline}`} />
                    </span>
                  )
                : renderHeartWithLikeCount(
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Log in to like posts!</Tooltip>}
                    >
                      <i className="far fa-heart" />
                    </OverlayTrigger>
                  )}
              <div className={styles.CommentContainer}>
                <i className="far fa-comments" />
                <span>Comments: {comments_count}</span>
              </div>
            </Media>
            <Comments comments={["Comment 1", "Comment 2", "Comment 3"]} />
            {is_owner && (
              <Link to={`/tutorials/${id}/edit`}>
                <button>Edit</button>
              </Link>
            )}
          </Card.Body>
        </Card>
        {steps && steps.length > 0 && (
          <Card className={styles.CustomCard}>
            <Card.Body>
              <Media className={styles.TutorialInfo}>
                <div className={styles.ImageContainer}></div>
                <div>
                  <h5 className={styles.DescText}>{description}</h5>
                  <div>
                    <p>
                      <strong>Language:</strong>
                      {language}
                    </p>
                    <p>
                      <strong>Engine:</strong>
                      {engine}
                    </p>
                    <p>
                      <strong>Engine version:</strong>
                      {engine_version}
                    </p>
                    <p>
                      <strong>Theme:</strong>
                      {theme}
                    </p>
                  </div>
                </div>
              </Media>
            </Card.Body>
            <Card.Body>
              <div>
                <h5 className={styles.StepHeader}>Steps:</h5>
                <ol>
                  {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                      <li className={styles.StepItem}>
                        <div className={styles.StepDescription}>
                          {step.step_description}
                        </div>
                        <div className={styles.StepImageContainer}>
                          <img
                            src={step.step_image}
                            alt={step.step_description}
                            className={styles.StepImage}
                          />
                        </div>
                      </li>
                      {index !== steps.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </ol>
              </div>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Tutorial;
