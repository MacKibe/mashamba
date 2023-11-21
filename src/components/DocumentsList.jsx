//
// Contains the documents from my Mashamba database
// import { useState } from "react";

const DocumentsList = ({ document, index, onClick }) => {
  const handle_click_document = () => {
    // 
    // Gives the index of the document.
    onClick(index);
  };

  return (
    <div className="DocumentsList" onClick={handle_click_document}>
      <p>
        <span>{document.pk}. </span>
        <span>{document.name_of_document}</span>
      </p>
    </div>
  );
};

export default DocumentsList;
