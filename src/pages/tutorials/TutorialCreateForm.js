import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Upload from "../../assets/upload.png";
import styles from "../../styles/TutorialCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { Image } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";

// Function to log the form data
function logFormData(formData) {
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
}

function TutorialCreateForm() {
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    description: "",
    image: "",
    language: "",
    engine: "",
    engine_version: "",
    theme: "",
    steps: [
      {
        step_description: "",
        step_image: "",
        tutorial: "",
      },
    ],
  });

  const {
    title,
    description,
    image,
    language,
    engine,
    engine_version,
    theme,
    steps,
  } = postData;

  const imageInput = useRef(null);
  const stepImageInput = useRef([]);
  const history = useHistory();

  // Handle change for input fields
  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle change for the main tutorial image
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  // Handle change for step description
  const handleChangeStep = (event, index) => {
    const updatedSteps = [...steps];
    updatedSteps[index].step_description = event.target.value;
    setPostData((prevState) => ({
      ...prevState,
      steps: updatedSteps,
    }));
  };

  // Handle change for step images
  const handleChangeStepImage = (event, index) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(steps[index].step_image);
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

  // Handle adding a new step
  const handleAddStep = () => {
    const newStep = {
      step_description: "",
      step_image: "",
    };
    setPostData((prevState) => ({
      ...prevState,
      steps: [...prevState.steps, newStep],
    }));
    stepImageInput.current.push(React.createRef());
  };

  // Validate that each step has a description
  const validateSteps = () => {
    return steps.every((step) => step.step_description.trim().length > 0);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateSteps()) {
      setErrors({ ...errors, steps: "Each step must have a description." });
      return;
    }
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", imageInput.current.files[0] || "");
    formData.append("language", language);
    formData.append("engine", engine);
    formData.append("engine_version", engine_version);
    formData.append("theme", theme);

    // Add steps data as a JSON string
    formData.append(
      "steps",
      JSON.stringify(
        steps.map((step, index) => ({
          step_description: step.step_description,
          order: index + 1,
        }))
      )
    );

    try {
      // Create tutorial with steps
      const { data: tutorialData } = await axiosReq.post(
        "tutorials/",
        formData
      );

      // Get tutorial ID from response
      const tutorialId = tutorialData.id;

      history.push(`/tutorials/${tutorialId}`);
    } catch (err) {
      console.log("Error Response:", err.response.data);
      if (err.response && err.response.status !== 401) {
        setErrors(err.response.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
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
                <div>
                  <Form.Label
                    className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                    htmlFor={`step-image-upload-${index}`}
                  >
                    Change the step image
                  </Form.Label>
                </div>
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
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <div className="d-md-none">{textFields}</div>
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
                        className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
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
                <Form.Label>Language</Form.Label>
                <Form.Control
                  type="text"
                  name="language"
                  value={language}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Engine</Form.Label>
                <Form.Control
                  type="text"
                  name="engine"
                  value={engine}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Engine Version</Form.Label>
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
              <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                onClick={() => history.goBack()}
              >
                Cancel
              </Button>
              <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                type="submit"
              >
                Create
              </Button>
            </div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default TutorialCreateForm;
