import React, { useRef, useState } from "react";
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
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

// Component for creating a tutorial form.
function TutorialCreateForm() {
  useRedirect("loggedOut");
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

  //Event handler for input field changes.
  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  //Event handler for image upload input field.
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  // Event handler for form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    // Add other form data fields
    formData.append("title", title);
    formData.append("description", description);
    formData.append("language", language);
    formData.append("engine", engine);
    formData.append("engine_version", engine_version);
    formData.append("theme", theme);
    formData.append("instructions", instructions);

    // Check if image input has a selected file
    if (imageInput.current.files.length) {
      const file = imageInput.current.files[0];

      // Perform client-side validation for image size
      if (file.size > 2 * 1024 * 1024) {
        // Display a warning to the user
        alert("Image size is larger than 2MB. Please choose a smaller image.");
        return;
      }

      formData.append("image", file);
    }

    try {
      const { data: tutorialData } = await axiosReq.post(
        "tutorials/",
        formData
      );

      const tutorialId = tutorialData.id;
      history.push(`/tutorials/${tutorialId}`);
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
            <h2>Create you own tutorial</h2>
            <div className="text-center">
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  name="description"
                  value={description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="text-center">
                {image ? (
                  <>
                    <figure>
                      <Image className={appStyles.Image} src={image} rounded />
                    </figure>
                    <div>
                      <Form.Label
                        className={styles.FormButton}
                        htmlFor="image-upload"
                      >
                        Change the image
                      </Form.Label>
                    </div>
                  </>
                ) : (
                  <Form.Label
                    className="d-flex justify-content-center"
                    htmlFor="image-upload"
                  >
                    <Asset
                      src={Upload}
                      message="Click or tap to upload a cover image"
                    />
                  </Form.Label>
                )}

                <Form.File
                  id="image-upload"
                  accept="image/*"
                  onChange={handleChangeImage}
                  ref={imageInput}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Coding Language</Form.Label>
                <Form.Control
                  type="text"
                  name="language"
                  value={language}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Game Engine</Form.Label>
                <Form.Control
                  type="text"
                  name="engine"
                  value={engine}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Game Engine Version</Form.Label>
                <Form.Control
                  type="text"
                  name="engine_version"
                  value={engine_version}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Theme</Form.Label>
                <Form.Control
                  type="text"
                  name="theme"
                  value={theme}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Instructions</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  name="instructions"
                  value={instructions}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button className={styles.FormButton} type="submit">
                Create Tutorial
              </Button>
            </div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default TutorialCreateForm;
