import React, { Fragment } from "react";
import { useDispatch } from "react-redux";

//delete experience implementation from the profile action

import formatDate from "../../auth/formatDate";
import { delete_experience } from "../../store/ProfileFormActions";
import { useNavigate } from "react-router-dom";
const Experience = ({ experience }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (experience.length === 0) {
    navigate("/dashboard");
  }

  const experiences = experience.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.company}</td>
      <td className="hide-sm">{edu.title}</td>
      <td>
        {formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : "Now"}
      </td>
      <td>
        <button
          onClick={() => dispatch(delete_experience(edu._id))}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  console.log(experiences);

  return (
    <Fragment>
      {experiences.length === 0 ? (
        <p>No experience is present</p>
      ) : (
        <Fragment>
          <h2 className="my-2">experience Credentials</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Company</th>
                <th className="hide-sm">Position</th>
                <th className="hide-sm">Years</th>
                <th />
              </tr>
            </thead>
            <tbody>{experiences.length === 0 ? "no" : experiences}</tbody>
          </table>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Experience;
