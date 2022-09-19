import React, { Fragment } from "react";
import { useEffect } from "react";
import { get_profile } from "../../store/ProfileActions";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Education from "./Education";
import Experience from "./Experience";
import { delete_account } from "../../store/ProfileFormActions";
const Dashboard = () => {
  const profile = useSelector((state) => state.profile.profile);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

 useEffect(() => {
    dispatch(get_profile());
  }, [dispatch]);

  
  return (
    <section className="container">
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {profile !== null? (
        <>
          <DashboardActions />
          <Education education={profile.education} />
          <Experience experience={profile.experience} />
        </>
      ) : (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create_profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      )}
      <div className="my-2">
        <button
          className="btn btn-danger"
          onClick={() => {
            dispatch(delete_account());
          }}
        >
          <i className="fas fa-user"></i> Remove the account
        </button>
      </div>
    </section>
  );
};

export default Dashboard;
