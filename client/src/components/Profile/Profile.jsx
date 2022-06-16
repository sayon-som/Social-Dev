import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { get_profile_by_id } from "../../store/ProfileActions";
import Spinner from "../layout/Spinner";

import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileEducation from "./ProfileEducation";
import ProfileExperience from "./ProfileExperience";
import ProfileGithub from "./ProfileGithub";
const Profile = () => {
  //get profiles
  //things I need :-> auth=>loading,user._id,

  //auth states
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);
  const isauth = useSelector((state) => state.auth.isauth);
  //profile states
  const profile = useSelector((state) => state.profile.profile);

  const dispatch = useDispatch();
  console.log(profile);
  
  //getting the id from the url
  const params = useParams();
  const id = params.id;
  //geting the profiles by Id
  useEffect(() => {
    dispatch(get_profile_by_id(id));
  }, [get_profile_by_id]);

  return (
    <section className="container">
      {profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {isauth && loading === false && user._id === profile.user._id && (
            <Link to="/edit_profile" className="btn btn-dark">
              Edit Profile
            </Link>
          )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((experience) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>

            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </section>
  );
};

export default Profile;
