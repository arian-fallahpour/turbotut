"use client";

import React, { useEffect, useState } from "react";
import classes from "./Select.module.scss";
import ReactSelect from "react-select";
import AsyncSelect from "react-select/async";
import Reveal from "../Reveal/Reveal";

const Select = ({ defaultValue, options, loadOptions, label, error, setFormValue, isAsync, ...otherProps }) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  const handleOnChange = (option) => {
    setSelectedOption(option);
    setFormValue(label, option.value);
  };

  useEffect(() => {
    if (defaultValue) setFormValue(label, defaultValue.value);
  }, []);

  const Tag = isAsync ? AsyncSelect : ReactSelect;

  return (
    <div className={classes.Select}>
      <Tag
        className={"react-select-container"}
        classNamePrefix="react-select"
        defaultValue={selectedOption}
        onChange={handleOnChange}
        options={options}
        cacheOptions={isAsync}
        loadOptions={loadOptions}
        {...otherProps}
      />
      <label>{label}</label>
      <Reveal className={classes.error} revealed={!!error}>
        {error}
      </Reveal>
    </div>
  );
};

export default Select;
