import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";

import { Link } from "react-router-dom";
import TEST_ID from "./Home.testid";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useUserContext } from "../../hooks/useUserContext";
import "./Home.css";
import background from "../../assets/landing/landing-background.jpg";
import diary from "../../assets/landing/landing-diary.png";
import logo from "../../assets/landing/landing-logo.png";
import p1 from "../../assets/landing/p1.png";
import p2 from "../../assets/landing/p2.png";
import p3 from "../../assets/landing/p3.png";
import p4 from "../../assets/landing/p4.png";
import p5 from "../../assets/landing/p5.png";
import noImage from "../../assets/no-image.png";

const Home = () => {
  const { dispatch } = useUserContext();
  const { auth } = useAuthContext();
  const navigate = useNavigate();
  // Fetch for getting user info from database
  const { performFetch, cancelFetch, isLoading, error } = useFetch(
    `/user/${auth?.id}`,
    (response) => {
      // Setting UserContext with fetched User.
      dispatch({ type: "SET_USER", payload: response.result });
      navigate("/my-posts");
    }
  );

  useEffect(() => {
    if (auth) {
      performFetch();
    }
    return cancelFetch;
  }, [auth]);
  return (
    <>
      {/* define background here to display in dev mode. Maybe will work in css after deploy */}
      <div
        className="landing-page"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="has-loading" data-testid={TEST_ID.container}>
          <div className="landing-left has-loading">
            <img src={logo} alt="Logo" />
            <h2>Start writing your first diary and share it with friends</h2>
            <br />
            <br />
            <p>
              You will be able to take notes, like them, save posts to your
              calendar to your calendar and find friends
            </p>
            <br />
            <br />
            <Link to={"/login"}>
              <button className="landing-login">Log in</button>
            </Link>
            <Link to={"/signup"}>
              <button className="landing-signup">Sign up</button>
            </Link>
            {error && (
              <div className="error">
                {typeof error === "string"
                  ? error
                  : "Error happened. Refresh the page"}
              </div>
            )}
            {isLoading && <Loading />}
          </div>
        </div>
        <div className="landing-right">
          <img
            src={diary}
            alt="Diary"
            onError={(e) => (e.target.src = noImage)}
          />
        </div>
        <div className="landing-container">
          <div className="landing-block primary">
            <div className="person">
              <img
                src={p1}
                alt="Person1"
                onError={(e) => (e.target.src = noImage)}
              />
              <h3 className="person-name">Daan</h3>
              <p className="person-description">Hi!</p>
            </div>
            <div className="person">
              <img
                src={p2}
                alt="Person2"
                onError={(e) => (e.target.src = noImage)}
              />
              <h3 className="person-name">Bram</h3>
              <p className="person-description">How are you?</p>
            </div>
            <div className="person">
              <img
                src={p3}
                alt="Person3"
                onError={(e) => (e.target.src = noImage)}
              />
              <h3 className="person-name">Emma</h3>
              <p className="person-description">Welcome to the diary!</p>
            </div>
            <div className="person">
              <img
                src={p4}
                alt="Person4"
                onError={(e) => (e.target.src = noImage)}
              />
              <h3 className="person-name">Lotte</h3>
              <p className="person-description">
                It&apos;s great to see you again!
              </p>
            </div>
            <div className="person">
              <img
                src={p5}
                alt="Person5"
                onError={(e) => (e.target.src = noImage)}
              />
              <h3 className="person-name">Sofie</h3>
              <p className="person-description">What a wonderful day!</p>
            </div>
          </div>
          <div className="landing-block secondary">
            <div className="person">
              <img
                src={p1}
                alt="Person1"
                onError={(e) => (e.target.src = noImage)}
              />
              <h3 className="person-name">Daan</h3>
              <p className="person-description">Hi!</p>
            </div>
            <div className="person">
              <img
                src={p2}
                alt="Person2"
                onError={(e) => (e.target.src = noImage)}
              />
              <h3 className="person-name">Bram</h3>
              <p className="person-description">How are you?</p>
            </div>
            <div className="person">
              <img
                src={p3}
                alt="Person3"
                onError={(e) => (e.target.src = noImage)}
              />
              <h3 className="person-name">Emma</h3>
              <p className="person-description">Welcome to the diary!</p>
            </div>
            <div className="person">
              <img
                src={p4}
                alt="Person4"
                onError={(e) => (e.target.src = noImage)}
              />
              <h3 className="person-name">Lotte</h3>
              <p className="person-description">
                It&apos;s great to see you again!
              </p>
            </div>
            <div className="person">
              <img
                src={p5}
                alt="Person5"
                onError={(e) => (e.target.src = noImage)}
              />
              <h3 className="person-name">Sofie</h3>
              <p className="person-description">What a wonderful day!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
