import React from "react";
import classes from "./Input.module.scss";
import { join, toCap } from "@/utils/helper";

const Input = ({ type, name, label, styleName = "transparent" }) => {
  return (
    <div
      className={join(
        classes.Input,
        styleName ? classes[`Input${toCap(styleName)}`] : null
      )}
    >
      <input type={type} name={name} id={`input-${name}`} placeholder={label} />
      <label htmlFor={`input-${name}`}>{label}</label>
    </div>
  );
};

export default Input;
