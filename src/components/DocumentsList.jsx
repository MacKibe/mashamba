//
// Contains the documents from my Mashamba database
// import { useState } from "react";

const DocumentsList = ( props, index, onClick ) => {
  const handle_click_document = () => {
    //
    // Provides the index of the document.
    onClick(index);
  };

  return (
    <div className="document" onClick={handle_click_document}>
      <a>
        <span>{props.pk}. </span>
        <span>{props.name_of_document}</span>
      </a>
    </div>
  );
};

export default DocumentsList;
