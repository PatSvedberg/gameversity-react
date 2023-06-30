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
        console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

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
      await axiosReq.put(`/tutorials/${id}`, formData);

      history.push(`/tutorials/${id}`);
    } catch (err) {
      console.log("Error Response:", err.response.data);
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
              <Form.Group>
                <Form.Label>Image</Form.Label>
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
                      message="Click or tap to upload a tutorial image"
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
              <Button
                className={styles.FormButton}
                onClick={() => history.goBack()}
              >
                Cancel
              </Button>
              <Button className={styles.FormButton} type="submit">
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
