import React from "react";

interface ListActionsProps {
  onSave: () => void;
  onDelete: () => void;
}

// Provides edit save and delete buttons.
const ListActions: React.FC<ListActionsProps> = ({ onSave, onDelete }) => {
  return (
    <>
      <button className="btn-save" onClick={onSave}>
        Save
      </button>
      <button className="btn-delete-transparent" onClick={onDelete}>
        X
      </button>
    </>
  );
};

export default ListActions;
