import React from "react";
import { Form } from "react-bootstrap";
import { FormInputProps } from "../../types/Types";

//REVIEW - fixed input values to put in separate file for
//REVIEW - better understanding.

//NOTE - Reusable input field for entering book details.
const FormInput: React.FC<FormInputProps> = ({ name, value, onChange }) => {
  return (
    <Form.Group>
      <label htmlFor={name}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>{" "}
      {/* Capitalizes first letter */}
      <Form.Control
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
      />
    </Form.Group>
  );
};

export default FormInput;
