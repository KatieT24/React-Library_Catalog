import React from "react";
import { Button } from "react-bootstrap";
import { FormButtonProps } from "../../types/Types";

//REVIEW - fixing componets and breakign them down into smaller files.
//REVIEW - making it easier to read, organize and fix.

//NOTE - Reusable button for submitting the form.
const FormButton: React.FC<FormButtonProps> = ({ text }) => {
  return (
    <Button type="submit" className="btn btn-text">
      {text}
    </Button>
  );
};

export default FormButton;
