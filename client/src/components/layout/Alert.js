import React from "react";
//fetching the alert components
import { alertSlice } from "../../store/alert";
import { useSelector } from "react-redux";
export default function Alert() {
  //getting the alert component
  //getting the alert array component
  const alert_array = useSelector((state) => state.alert.alert);
  
  //mapping through the array
  const alertMessage =
    alert_array != null &&
    alert_array.length > 0 &&
    alert_array.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        {alert.msg}
      </div>
    ));
  return alertMessage;
}
