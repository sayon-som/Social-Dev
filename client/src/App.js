import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { useDispatch } from "react-redux";
//redux
import setauth from "./auth/addauthtoken";
import { load_user } from "./store/auth_actions";
import store from "./store";
import { Provider } from "react-redux";
import Alert from "./components/layout/Alert";
if (localStorage.token) {
  setauth(localStorage.token);
}
const App = () => {
  //load the users
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(load_user());
  }, [dispatch]);
  return (
    <Fragment>
      <Router>
        <Fragment>
          {/* adding the landing and the navabr page */}

          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
          </Routes>
          <section className="container">
            <Alert />
          </section>
          <section className="container">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </section>
        </Fragment>
      </Router>
    </Fragment>
  );
};

export default App;
