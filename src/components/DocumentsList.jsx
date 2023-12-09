//
// Contains the documents from my Mashamba database
// import { useState } from "react";

const DocumentsList = (props, doc_index, onClick) => {
  const handle_click_document = () => {
    //
    // Provides the index of the document.
    onClick(doc_index);
  };

  return (
    <div className="document" onClick={handle_click_document}>
      <a>
        <span>{props.doc_name}</span>
      </a>
    </div>
  );
};

export default DocumentsList;
