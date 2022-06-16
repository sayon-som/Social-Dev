import React, { Fragment, useEffect } from "react";

import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import { get_all_profiles } from "../../store/ProfileActions";
import { useDispatch, useSelector } from "react-redux";
const Profiles = () => {
  //select the profiles and the loading states
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_all_profiles());
  }, [get_all_profiles]);
  const profiles = useSelector((state) => state.profile.profiles);
  const loading = useSelector((state) => state.profile.loading);
 
  return (
    <section className="container">
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </section>
  );
};

export default Profiles;
