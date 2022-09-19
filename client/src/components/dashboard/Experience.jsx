import React, { Fragment } from "react";
import { useDispatch } from "react-redux";

//delete experience implementation from the profile action

import formatDate from "../../auth/formatDate";
import { delete_experience } from "../../store/ProfileFormActions";

const Experience = ({ experience }) => {
  const dispatch = useDispatch();

 
  //fucking nuisance working with the redux toolkit
  
  const experiences = experience?.map((edu) => (
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
  

  return (
    
         <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
  
};

export default Experience;
