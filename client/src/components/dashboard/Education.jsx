import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

//delete education implementation from the profile action

import formatDate from "../../auth/formatDate";
import { delete_education } from "../../store/ProfileFormActions";
import { useNavigate,Redirect, Navigate } from "react-router-dom";
const Education = ({ education }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

//   useEffect(()=>{
// if (education.length === 0) {  
//      navigate("/dashboard");
//   }
//   },[navigate,education.length]);  
  
//  if(education!==null){
//   if(education.length===0){
//     return <Navigate to="/dashboard"/>
//   }
//  }
// useEffect(()=>{
//   if(education!==null){
//   if(education.length===0){      <Navigate to="/dashboard"/>
//   }  }
// },[education])
  const educations = education?.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        {formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : "Now"}
      </td>
      <td>
        <button
          onClick={() => dispatch(delete_education(edu._id))}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  

  return (
    //   <Fragment>
    //     <h2 className="my-2">Education Credentials</h2>
    //     <table className="table">
    //       <thead>
    //         <tr>
    //           <th>School</th>
    //           <th className="hide-sm">Degree</th>
    //           <th className="hide-sm">Years</th>
    //           <th />
    //         </tr>
    //       </thead>
    //       <tbody>{educations.length === 0 ? "no" : educations}</tbody>
    //     </table>
    //   </Fragment>
    // )}
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
   
  
};

export default Education;
