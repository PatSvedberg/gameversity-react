import React, { useEffect, useState } from "react";
import styles from "../../styles/Tutorial.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import CommentCreateForm from "../comments/CommentCreateForm";
import Comment from "../comments/Comment";
import { axiosReq } from "../../api/axiosDefaults";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";

// React component representing a tutorial
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
    instructions,
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
    // Fetch comments for the tutorial
    const handleMount = async () => {
      try {
        const { data: comments } = await axiosReq.get(
          `/comments/?tutorial=${id}`
        );
        setComments(comments);
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [id]);

  const handleEdit = () => {
    // Handle edit button click
    history.push(`/tutorials/${id}/edit`);
  };

  const handleDelete = async () => {
    // Handle delete button click
    try {
      await axiosRes.delete(`/tutorials/${id}`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    // Handle like button click
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

  const handleUnlike = async () => {
    // Handle unlike button click
    try {
      await axiosRes.delete(`/likes/${like_id}`);
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
          {/* Profile picture and link to the profile */}
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
        </div>
        <h2>{title}</h2>
        <div className={styles.Dropdown}>
          {/* Display dropdown menu for the owner of tutorial page */}
          {is_owner && tutorialPage && (
            <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />
          )}
        </div>
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
                  {/* Show and handle like button */}
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
                  </Link>
                  {comments_count}
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
            <div className={styles.InstructionsSection}>
              <h3>Instructions:</h3>
              <p>{instructions}</p>
            </div>
            <Container className={appStyles.Comment}>
              {currentUser ? (
                <CommentCreateForm
                  profile_id={currentUser.profile_id}
                  profileImage={currentUser.profile_image} // Use currentUser's profile image
                  tutorial={id}
                  setTutorials={setTutorials}
                  setComments={setComments}
                />
              ) : comments.results.length ? (
                <span>Comments</span>
              ) : null}
              {comments.results.length ? (
                <InfiniteScroll
                  dataLength={comments.results.length}
                  loader={<Asset spinner />}
                  hasMore={!!comments.next}
                  next={() => fetchMoreData(comments, setComments)}
                >
                  {comments.results.map((comment) => (
                    <Comment
                      key={comment.id}
                      {...comment}
                      setTutorials={setTutorials}
                      setComments={setComments}
                    />
                  ))}
                </InfiniteScroll>
              ) : currentUser ? (
                <span>No comments yet, be the first to comment!</span>
              ) : (
                <span>No comments... yet</span>
              )}
            </Container>
          </Card.Body>
        </Card>
      </section>
    </div>
  );
};

export default Tutorial;
