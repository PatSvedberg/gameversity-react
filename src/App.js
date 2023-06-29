import React, { createContext } from "react";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import TutorialCreateForm from "./pages/tutorials/TutorialCreateForm";
import TutorialPage from "./pages/tutorials/TutorialPage";
import TutorialsPage from "./pages/tutorials/TutorialsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import TutorialEditForm from "./pages/tutorials/TutorialEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import NotFound from "./components/NotFound";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <TutorialsPage message="No results found. Try another keyword" />
            )}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <TutorialsPage
                message="No results found. Try another keyword"
                filter={`owner__subscribed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/liked"
            render={() => (
              <TutorialsPage
                message="No results found. Try another keyword"
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route
            exact
            path="/tutorials/create"
            render={() => <TutorialCreateForm />}
          />
          <Route exact path="/tutorials/:id" render={() => <TutorialPage />} />
          <Route
            exact
            path="/tutorials/:id/edit"
            render={() => <TutorialEditForm />}
          />
          <Route exact path="/profiles/:id/" render={() => <ProfilePage />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
