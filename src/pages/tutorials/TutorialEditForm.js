import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Upload from "../../assets/upload.png";
import styles from "../../styles/TutorialCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { Image } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import btnStyles from "../../styles/Button.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TutorialEditForm() {
  const [setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    description: "",
    image: "",
    language: "",
    engine: "",
    engine_version: "",
    theme: "",
    instructions: "",
  });

  // Destructure postData into individual variables for easier access
  const {
    title,
    description,
    image,
    language,
    engine,
    engine_version,
    theme,
    instructions,
  } = postData;

  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  // Fetch the tutorial data when the component mounts
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/tutorials/${id}`);
        const {
          title,
          description,
          image,
          language,
          engine,
          engine_version,
          theme,
          instructions,
          is_owner,
        } = data;

        // If the user is the owner of the tutorial, update the form data
        // Otherwise, redirect the user to the start page
        is_owner
          ? setPostData({
              title,
              description,
              image,
              language,
              engine,
              engine_version,
              theme,
              instructions,
              is_owner,
            })
          : history.push("/");
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  // Event handler for input field changes
  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  // Event handler for image upload
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  // Event handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const emptyFields = [];

    if (!title) emptyFields.push("• Title");
    if (!description) emptyFields.push("• Description");
    if (!language) emptyFields.push("• Coding Language");
    if (!engine) emptyFields.push("• Game Engine");
    if (!engine_version) emptyFields.push("• Game Engine Version");
    if (!theme) emptyFields.push("• Theme");
    if (!instructions) emptyFields.push("• Instructions");

    if (emptyFields.length > 0) {
      // Display a toast notification to the user with the list of empty fields
      toast.error(
        `Please fill out the following required fields:\n${emptyFields
          .map((item) => item + "\n")
          .join("")}`
      );
      return;
    }

    // Append form data to the formData object
    formData.append("title", title);
    formData.append("description", description);
    if (imageInput.current.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }
    formData.append("language", language);
    formData.append("engine", engine);
    formData.append("engine_version", engine_version);
    formData.append("theme", theme);
    formData.append("instructions", instructions);

    try {
      // Send a PUT request to update the tutorial with the new data
      await axiosReq.put(`/tutorials/${id}`, formData);

      // Redirect the user to the tutorial page
      history.push(`/tutorials/${id}`);
    } catch (err) {
      // console.log("Error Response:", err.response.data);
      if (err.response && err.response.status !== 401) {
        setErrors(err.response.data);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container className={styles.FullForm}>
            <h2>Edit your tutorial</h2>
            <div className="text-center">
              <Form.Group>
                <label htmlFor="title">Title</label>
                <Form.Control
                  type="text"
                  name="title"
                  value={title}
                  onChange={handleChange}
                  id="title"
                />
              </Form.Group>
              <Form.Group>
                <label htmlFor="description">Description</label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  name="description"
                  value={description}
                  onChange={handleChange}
                  id="description"
                />
              </Form.Group>
              <Form.Group>
                {image ? (
                  <>
                    <label htmlFor="image-display">Image</label>
                    <figure>
                      <Image
                        className={appStyles.Image}
                        src={image}
                        rounded
                        alt="Tutorial"
                      />
                    </figure>
                    <div>
                      <label
                        className={`${btnStyles.Button} ${btnStyles.Orange}`}
                        htmlFor="image-upload"
                      >
                        Change <br /> the image
                      </label>
                    </div>
                  </>
                ) : (
                  <label
                    className="d-flex justify-content-center"
                    htmlFor="image-upload"
                  >
                    <Asset
                      src={Upload}
                      message="Click or tap to upload a tutorial image"
                      alt="Upload Icon"
                    />
                  </label>
                )}
                <Form.File
                  id="image-upload"
                  accept="image/*"
                  onChange={handleChangeImage}
                  ref={imageInput}
                />
              </Form.Group>
              <Form.Group>
                <label htmlFor="language">Coding Language</label>
                <Form.Control
                  type="text"
                  name="language"
                  value={language}
                  onChange={handleChange}
                  id="language"
                />
              </Form.Group>
              <Form.Group>
                <label htmlFor="engine">Game Engine</label>
                <Form.Control
                  type="text"
                  name="engine"
                  value={engine}
                  onChange={handleChange}
                  id="engine"
                />
              </Form.Group>
              <Form.Group>
                <label htmlFor="engine_version">Game Engine Version</label>
                <Form.Control
                  type="text"
                  name="engine_version"
                  value={engine_version}
                  onChange={handleChange}
                  id="engine_version"
                />
              </Form.Group>
              <Form.Group>
                <label htmlFor="theme">Theme</label>
                <Form.Control
                  type="text"
                  name="theme"
                  value={theme}
                  onChange={handleChange}
                  id="theme"
                />
              </Form.Group>
              <Form.Group>
                <label htmlFor="instructions">Instructions</label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  name="instructions"
                  value={instructions}
                  onChange={handleChange}
                  id="instructions"
                />
              </Form.Group>
              <Button
                className={`${btnStyles.Button} ${btnStyles.Orange}`}
                onClick={() => history.goBack()}
              >
                Cancel
              </Button>
              <Button
                className={`${btnStyles.Button} ${btnStyles.Orange}`}
                type="submit"
              >
                Save
              </Button>
            </div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default TutorialEditForm;
