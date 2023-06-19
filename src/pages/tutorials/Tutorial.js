import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Tutorial.module.css";
import Divider from "@mui/material/Divider";

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

  return (
    <div>
      <div className={styles.TopDiv}>
        <Link to={`/profiles/${profile_id}`}>
          <OverlayTrigger placement="top" overlay={renderTooltip}>
            <Avatar src={profile_image} height={55} />
          </OverlayTrigger>
        </Link>
        <h2>{title}</h2>
      </div>
      <Card className={styles.CustomCard}>
        <small className="text-muted">
          Created at: {new Date(created_at).toLocaleDateString()}
        </small>
      </Card>
      <Card className={styles.CustomCard}>
        <small className="text-muted">
          Last updated: {new Date(updated_at).toLocaleDateString()}
        </small>
      </Card>
      <div className={styles.TutorialContainer}>
        <Card className={styles.CustomCard}>
          <Card.Body>
            <Media className={styles.TutorialRight}>
              <div className={styles.ImageContainer}>
                <Link to={`/profiles/${profile_id}`}>
                  <img src={image} alt={title} className={styles.Image} />
                </Link>
              </div>
              <div className={styles.LikeCommentContainer}>
                <span>Likes: {likes_count}</span>
                <span>Comments: {comments_count}</span>
              </div>
            </Media>
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
                    <p><strong>Language:</strong>{language}</p>
                    <p><strong>Engine:</strong>{engine}</p>
                    <p><strong>Engine version:</strong>{engine_version}</p>
                    <p><strong>Theme:</strong>{theme}</p>
                  </div>
                </div>
              </Media>
            </Card.Body>
            <Card.Body>
              <div>
                <h5>Steps:</h5>
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
