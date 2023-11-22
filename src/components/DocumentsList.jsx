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
    <div className="document" onClick={handle_click_document}>
      <a>
        <span>{document.pk}. </span>
        <span>{document.name_of_document}</span>
      </a>
    </div>
  );
};

export default DocumentsList;
