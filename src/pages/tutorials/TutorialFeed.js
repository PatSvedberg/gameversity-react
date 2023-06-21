import React, { useEffect, useState } from "react";
import styles from "../../styles/Tutorial.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const TutorialFeed = (props) => {
  const {
    title,
    image,
    owner,
    profile_id,
    profile_image,
    created_at,
    updated_at,
    id,
    like_id,
    comments_count,
    likes_count,
    tutorialPage,
    setTutorials,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: comments }] = await Promise.all([
          axiosReq.get(`/comments/?tutorial=${id}`),
        ]);
        setComments(comments);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  const handleEdit = () => {
    history.push(`/tutorials/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/tutorials/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { tutorial: id });
      setTutorials((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((tutorial) => {
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
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setTutorials((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((tutorial) => {
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
      console.log(err);
    }
  };

  return (
    <div className={styles.Full}>
      <div className={styles.TopDiv}>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} height={55} />
          {owner}
        </Link>
        <h2>{title}</h2>
        <div>
          {is_owner && tutorialPage && (
            <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />
          )}
        </div>
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
                  <img src={image} className={styles.Image} alt="" />
                </Link>
              </div>
              {is_owner ? (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>You can't like your own post!</Tooltip>}
                >
                  <i className="far fa-heart" />
                </OverlayTrigger>
              ) : like_id ? (
                <span onClick={handleUnlike}>
                  <i className={`fas fa-heart ${styles.Heart}`} />
                </span>
              ) : currentUser ? (
                <span onClick={handleLike}>
                  <i className={`far fa-heart ${styles.HeartOutline}`} />
                </span>
              ) : (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Log in to like posts!</Tooltip>}
                >
                  <i className="far fa-heart" />
                </OverlayTrigger>
              )}

              {likes_count}
              <Link to={`/tutorials/${id}`}>
                <i className="far fa-comments" />
              </Link>
              {comments_count}
            </Media>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default TutorialFeed;
