import { FormRow } from "@/components/Elements/Form/Form";
import Input from "@/components/Elements/Input/Input";
import Select from "@/components/Elements/Select/Select";
import { debounce } from "@/utils/helper";
import React from "react";

const DocumentModalInput = ({
  document,
  field,
  error,
  setOtherField,
  setDefault,
}) => {
  const stringValidator = (v) => v.length > 0;

  // ENUM FIELD
  if (field.type === "enum") {
    const options = field.values.map((v) => ({ value: v, label: v }));
    const defaultValue =
      setDefault && document
        ? { value: document[field.name], label: document[field.name] }
        : undefined;

    return (
      <FormRow key={field.name}>
        <Select
          defaultValue={defaultValue}
          options={options}
          label={field.name}
          setFormValue={setOtherField}
        />
      </FormRow>
    );
  }

  // BOOLEAN FIELD
  if (field.type === "boolean") {
    const options = [
      { value: "true", label: "true" },
      { value: "false", label: "false" },
    ];
    const defaultValue =
      setDefault && document
        ? {
            value: JSON.stringify(document[field.name]),
            label: JSON.stringify(document[field.name]),
          }
        : undefined;

    return (
      <FormRow key={field.name}>
        <Select
          defaultValue={defaultValue}
          options={options}
          label={field.name}
          setFormValue={setOtherField}
          error={error}
        />
      </FormRow>
    );
  }

  // ID FIELD
  if (field.type === "id") {
    const defaultValue =
      setDefault && document
        ? { value: document._id, label: document.name }
        : undefined;

    let documents;
    const loadOptions = debounce((val, callback) => {
      const filterDocuments = (docs) => {
        return docs
          .filter((d) => d.name.toLowerCase().includes(val.toLowerCase()))
          .map((d) => ({ value: d._id, label: d.name }));
      };

      fetch(`/api/${field.collection}?search=${val}&limit=2&select=name`)
        .then((res) => res.json())
        .then((resData) => {
          documents = resData.data[field.collection];

          callback(filterDocuments(documents));
        })
        .catch((err) => console.log("EE", err));
    }, 1000);

    return (
      <FormRow key={field.name}>
        <Select
          isAsync
          defaultValue={defaultValue}
          loadOptions={loadOptions}
          label={field.name}
          setFormValue={setOtherField}
        />
      </FormRow>
    );
  }

  // OTHER FIELD
  let inputType, defaultValue, options;
  if (field.type === "image") {
    inputType = "file";
  } else {
    inputType = "text";
    defaultValue = setDefault ? document[field.name] : undefined;
  }

  return (
    <FormRow key={field.name}>
      <Input
        type={inputType}
        name={field.name}
        label={field.name}
        error={error}
        defaultValue={defaultValue}
        options={options}
        validator={stringValidator}
        styleName="stack"
      />
    </FormRow>
  );
};

export default DocumentModalInput;
