import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";

import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { Button, Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Tutorial from "../tutorials/TutorialFeedCard";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";
import { ProfileEditDropdown } from "../../components/MoreDropdown";

// Component for rendering a user's profile page.
function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profileTutorials, setProfileTutorials] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const { id } = useParams();

  const { setProfileData, handleSubscribe, handleUnsubscribe } =
    useSetProfileData();
  const { pageProfile } = useProfileData();

  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profileTutorials }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/tutorials/?owner__profile=${id}`),
          ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfileTutorials(profileTutorials);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <Container>
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
            alt="Profile Image"
          />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{profile?.owner}</h3>
          <Row className="counters">
            <Col xs={12} className="my-2">
              <div>Tutorials</div>
              <div>{profile?.tutorial_count}</div>
            </Col>
            <Col xs={12} className="my-2">
              <div>Subscribers</div>
              <div>{profile?.subscribers_count}</div>
            </Col>
            <Col xs={12} className="my-2">
              <div>Subscribing</div>
              <div>{profile?.subscribing_count}</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
          {currentUser &&
            !is_owner &&
            (profile?.subscribing_id ? (
              <Button
                className={styles.UnsubButton}
                onClick={() => handleUnsubscribe(profile)}
              >
                Unsubscribe
              </Button>
            ) : (
              <Button
                className={styles.SubButton}
                onClick={() => handleSubscribe(profile)}
              >
                Subscribe
              </Button>
            ))}
        </Col>
        {profile?.content && <Col className="p-3">{profile.content}</Col>}
      </Row>
    </Container>
  );

  const mainProfileTutorials = (
    <>
      <hr />
      <p className="text-center">{profile?.owner}&apos;s tutorials</p>
      <hr />
      {profileTutorials.results.length ? (
        <InfiniteScroll
          dataLength={profileTutorials.results.length}
          loader={<Asset spinner />}
          hasMore={!!profileTutorials.next}
          next={() => fetchMoreData(profileTutorials, setProfileTutorials)}
        >
          {profileTutorials.results.map((tutorial) => (
            <Tutorial
              key={tutorial.id}
              {...tutorial}
              setTutorials={setProfileTutorials}
            />
          ))}
        </InfiniteScroll>
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't posted yet.`}
        />
      )}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Container className={styles.FullProfile}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfileTutorials}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;
