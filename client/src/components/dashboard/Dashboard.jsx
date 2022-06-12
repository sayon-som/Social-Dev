import React, { Fragment } from "react";
import { useEffect } from "react";
import { get_profile } from "../../store/ProfileActions";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
const Dashboard = () => {
  const loading = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.profile);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_profile());
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1>welcome {user && user.name}</h1>
      {profile ? <h1>has </h1>:<h1>does not</h1>}
      
    </Fragment>
  );
};

export default Dashboard;
