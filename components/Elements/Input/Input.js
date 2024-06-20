"use client";

import React, { useState } from "react";
import classes from "./Input.module.scss";
import { join, toCap } from "@/utils/helper";
import Reveal from "../Reveal/Reveal";
import Button from "../Button/Button";

const Input = ({
  className,
  type,
  name,
  label,
  options = [],
  defaultValue,
  error,
  validator = (v) => {},
  styleName = "outline",
  ...otherProps
}) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState(defaultValue || "");
  const [isValid, setIsValid] = useState(true);

  const onChangeHandler = (e) => {
    if (otherProps.onChange) otherProps.onChange(e);
    setValue(e.target.value);
  };

  const onFocusHandler = () => {
    if (otherProps.onFocus) otherProps.onFocus();
    setIsValid(true);
    setFocused(true);
  };

  const onBlurHandler = () => {
    if (otherProps.onBlur) otherProps.onBlur();
    setIsValid(validator(value));
    setFocused(false);
  };

  const inputProps = {
    ...otherProps,
    type: type,
    placeholder: label,
    name: name,
    id: `input-${name}`,
    value: value,
    onFocus: onFocusHandler,
    onBlur: onBlurHandler,
    onChange: onChangeHandler,
  };

  return (
    <div
      className={join(
        className,
        classes.Input,
        classes[`Input--{toCap(type)}`],
        styleName ? classes[`Input${toCap(styleName)}`] : null,
        !isValid || error ? classes.invalid : null
      )}
    >
      <input {...inputProps} />
      <label htmlFor={`input-${name}`}>{label}</label>
      <Reveal className={classes.error} revealed={!!error}>
        {error}
      </Reveal>
    </div>
  );
};

export default Input;
