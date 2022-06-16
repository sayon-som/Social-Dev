import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { useDispatch } from "react-redux";
//redux
import Create_profile from "./components/Profile_ops/Create_profile";
///importing the private route
import Dashboard from "./components/dashboard/Dashboard";
import setauth from "./auth/addauthtoken";
import { load_user } from "./store/auth_actions";
import store from "./store";
import { Provider } from "react-redux";
import Alert from "./components/layout/Alert";
import PrivateRoute from "./components/routing/PrivateRoute";
import Edit_profile from "./components/Profile_ops/Edit_Profile";
import Add_education from "./components/Profile_ops/Add_education";
import Add_Experience from "./components/Profile_ops/Add_Experience";
import Profiles from "./components/Profiles/Profiles";
import Profile from "./components/Profile/Profile";
import Post from "./components/Posts/Post";
if (localStorage.token) {
  setauth(localStorage.token);
}
const App = () => {
  //load the users
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(load_user());
  }, []);
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
              <Route
                path="dashboard"
                element={<PrivateRoute component={Dashboard} />}
              />
              {/* <Route
                path="create_profile"
                element={<PrivateRoute component={Create_profile} />}
              /> */}
              <Route path="/create_profile" element={<Create_profile />} />
              <Route path="/edit_profile" element={<Edit_profile />} />
              <Route path="/add_education" element={<Add_education />} />
              <Route path="/add_experience" element={<Add_Experience />} />
              <Route path="/profiles" element={<Profiles />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/posts" element={<Post />} />
            </Routes>
          </section>
        </Fragment>
      </Router>
    </Fragment>
  );
};

export default App;
