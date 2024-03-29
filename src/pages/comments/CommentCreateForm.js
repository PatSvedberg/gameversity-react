import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import btnStyles from "../../styles/Button.module.css";

/**
 * Component for creating a comment.
 */
function CommentCreateForm(props) {
  const { tutorial, setTutorials, setComments, profileImage, profile_id } =
    props;
  const [comment, setComment] = useState("");

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        comment,
        tutorial,
      });
      // The function to update the comments data.
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      // The function to update the tutorial data.
      setTutorials((prevTutorial) => ({
        results: [
          {
            ...prevTutorial.results[0],
            comments_count: prevTutorial.results[0].comments_count + 1,
          },
        ],
      }));
      setComment("");
    } catch (err) {
      // console.log(err);
    }
  };

  // The rendered component.
  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          <Form.Control
            className={styles.Form}
            placeholder="My comment..."
            as="textarea"
            value={comment}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <button
        className={`${btnStyles.Button} ${btnStyles.Orange} btn d-block ml-auto`}
        disabled={!comment.trim()}
        type="submit"
      >
        Send
      </button>
    </Form>
  );
}

export default CommentCreateForm;
