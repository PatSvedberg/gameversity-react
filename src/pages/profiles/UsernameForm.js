import React, { useEffect, useState } from "react";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

// Component for rendering a form to change the user's username.
const UsernameForm = () => {
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const { id } = useParams();

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  useEffect(() => {
    if (currentUser?.profile_id?.toString() === id) {
      // Set the initial username value to the current user's username
      setUsername(currentUser.username);
    } else {
      // Redirect user if they are not the owner of this profile
      history.push("/");
    }
  }, [currentUser, history, id]);

  // Event handler for form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put("/dj-rest-auth/user/", {
        username,
      });
      // Update the current user's username in the context
      setCurrentUser((prevUser) => ({
        ...prevUser,
        username,
      }));
      history.goBack();
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <Row>
      <Col className="py-2 mx-auto text-center" md={6}>
        <Container className={appStyles.Content}>
          <Form onSubmit={handleSubmit} className="my-2">
            <Form.Group>
              <Form.Label htmlFor="username">Change username</Form.Label>
              <Form.Control
                id="username"
                placeholder="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Form.Group>

            {errors?.username?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
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
              Save
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default UsernameForm;
