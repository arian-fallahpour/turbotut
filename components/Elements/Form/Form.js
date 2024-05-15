import { join } from "@/utils/helper";
import React from "react";
import classes from "./Form.module.scss";

const Form = ({ className, children, ...otherProps }) => {
  return (
    <form className={join(className, classes.Form)} {...otherProps}>
      {children}
    </form>
  );
};

export const FormRow = ({ className, children, ...otherProps }) => {
  return (
    <div className={join(className, classes.FormRow)} {...otherProps}>
      {children}
    </div>
  );
};

export const FormCol = ({ className, children, ...otherProps }) => {
  return (
    <div className={join(className, classes.FormCol)} {...otherProps}>
      {children}
    </div>
  );
};

export default Form;
