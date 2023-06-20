import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Tutorial from "./Tutorial";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/TutorialsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from "../../assets/no-results.png";

function TutorialsPage({ message, filter = "" }) {
  const [tutorials, setTutorials] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchTutorial = async () => {
      try {
        const { data } = await axiosReq.get(`/tutorials/?${filter}`);
        setTutorials(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    fetchTutorial();
  }, [filter, pathname]);
  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles mobile</p>
        {hasLoaded ? (
          <>
            {tutorials.results.length ? (
              tutorials.results.map((tutorial) => (
                <Tutorial
                  key={tutorial.id}
                  {...tutorial}
                  setTutorials={setTutorials}
                />
              ))
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Popular profiles for desktop</p>
      </Col>
    </Row>
  );
}

export default TutorialsPage;
