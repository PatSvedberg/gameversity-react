import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Tutorial from "./Tutorial";

function TutorialPage() {
  const { id } = useParams();
  const [tutorial, setTutorials] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: tutorial }] = await Promise.all([
          axiosReq.get(`/tutorials/${id}`),
        ]);
        setTutorials({ results: [tutorial] });
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Tutorial
          {...tutorial.results[0]}
          setTutorials={setTutorials}
          tutorialPage
        />
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2"></Col>
    </Row>
  );
}

export default TutorialPage;
