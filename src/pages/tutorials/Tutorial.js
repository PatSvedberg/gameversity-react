import React, { useEffect, useState, useRef } from "react";
import styles from "../../styles/Tutorial.module.css";
import Divider from "@mui/material/Divider";
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
import Upload from "../../assets/upload.png";
import { Image } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import btnStyles from "../../styles/Button.module.css";

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
    tutorialPage,
    setTutorials,
  } = props;

  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    steps: [
      {
        step_description: "",
        step_image: "",
      },
    ],
  });

  const { steps } = postData;
  const stepImageInput = useRef([]);

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data: comments } = await axiosReq.get(
          `/comments/?tutorial=${id}`
        );
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
      console.log(err);
    }
  };

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
      console.log(err);
    }
  };

  const handleChangeStep = (event, index) => {
    const updatedSteps = [...steps];
    updatedSteps[index].step_description = event.target.value;
    setPostData((prevState) => ({
      ...prevState,
      steps: updatedSteps,
    }));
  };

  const handleChangeStepImage = (event, index) => {
    if (event.target.files.length) {
      const updatedSteps = [...steps];
      updatedSteps[index] = {
        ...updatedSteps[index],
        step_image: URL.createObjectURL(event.target.files[0]),
      };
      setPostData((prevState) => ({
        ...prevState,
        steps: updatedSteps,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateSteps()) {
      setErrors({ ...errors, steps: "Each step must have a description." });
      return;
    }

    try {
      // Create tutorial with steps
      const { data: tutorialData } = await axiosReq.post("tutorials/", {
        ...postData, // Include all other tutorial data
      });

      const tutorialId = tutorialData.id;
      history.push(`/tutorials/${tutorialId}`);
    } catch (err) {
      console.log("Error Response:", err.response.data);
      if (err.response && err.response.status !== 401) {
        setErrors(err.response.data);
      }
    }
  };

  const validateSteps = () => {
    for (let i = 0; i < steps.length; i++) {
      if (!steps[i].step_description.trim()) {
        return false;
      }
    }
    return true;
  };

  const handleAddStep = () => {
    setPostData((prevState) => ({
      ...prevState,
      steps: [...prevState.steps, { step_description: "", step_image: "" }],
    }));
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
        <div className={styles.Dropdown}>
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
                      <div className={styles.ImageContainer}></div>
                      <div>
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
            <Container className={appStyles.Comment}>
              {currentUser ? (
                <CommentCreateForm
                  profile_id={currentUser.profile_id}
                  profileImage={profile_image}
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
      <div className={styles.Step}>
        {steps && steps.length > 0 && (
          <Card className={styles.CustomCard}>
            <Card.Body>
              <div>
                <h5 className={styles.StepHeader}>Steps:</h5>
                <ol>
                  {steps.map((step, index) => (
                    <React.Fragment key={index}>
                      <li className={styles.StepItem}>
                        <div className={styles.StepDescription}>
                          {step.step_description}
                        </div>
                        <div className={styles.StepImageContainer}>
                          <img
                            src={step.step_image}
                            className={styles.StepImage}
                            alt={`Step ${index + 1}`}
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
        {steps.map((step, index) => (
          <div key={index}>
            <Form.Group>
              <Form.Label>Step {index + 1} Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                name="step_description"
                value={step.step_description}
                onChange={(event) => handleChangeStep(event, index)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Step {index + 1} Image</Form.Label>
              {step.step_image ? (
                <>
                  <figure>
                    <Image
                      className={appStyles.Image}
                      src={step.step_image}
                      rounded
                    />
                  </figure>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor={`step-image-upload-${index}`}
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image for this step"
                  />
                </Form.Label>
              )}

              <Form.File
                id={`step-image-upload-${index}`}
                accept="image/*"
                onChange={(event) => handleChangeStepImage(event, index)}
                ref={(el) => (stepImageInput.current[index] = el)}
              />
            </Form.Group>
          </div>
        ))}
        <Button
          className={`${btnStyles.Button} ${btnStyles.Blue}`}
          onClick={handleAddStep}
        >
          Add Step
        </Button>
        <Button
          className={`${btnStyles.Button} ${btnStyles.Blue}`}
          type="submit"
          onClick={handleSubmit}
        >
          Submit Steps
        </Button>
      </div>
    </div>
  );
};

export default Tutorial;
