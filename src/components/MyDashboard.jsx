import DocumentsList from "./DocumentsList";
import TranscriptionsSection from "./TranscriptionsSection";
import ImagesSection from "./ImagesSection";
import FilterSection from "./FilterSection";
import { useState } from "react";
import documents from "../data.js";

function MyDashboard() {
  //
  // I want the first document to be shown when I visit the page before any selection is done.
  const [selected_document_index, set_new_selected_document_index] =
    useState(0);

  //
  // Update the index when a document is clicked/selected
  const handle_click_document = (index) => {
    set_new_selected_document_index(index);
  };
  return (
    <>
      <div className="body--section">
        <div className="side-panel">
          <FilterSection />
          <div className="documents--section">
            <h2>
              Documents
              <div>Total number of documents:{documents.length}</div>
            </h2>
            {documents.map((document, index) => (
              <DocumentsList
                //
                // Each item in the array should have an index,
                // this is for better identification of the items.
                key={index}
                //
                // Send my document name data to my component.
                doc_name={document.id}
                //
                // This is index of a document item inside the document object array
                index={index}
                //
                // This is event listener.
                onClick={handle_click_document}
              />
            ))}
          </div>
        </div>
        <div className="main--section">
          <div className="main--image_section">
            {/* Display image when selected */}
            {selected_document_index !== null && (
              <ImagesSection
                //
                // Display image with the index provided from the same selected document index
                images={documents[selected_document_index].images}
                index={selected_document_index}
              />
            )}
          </div>
          <div className="main--transcription_section">
            {selected_document_index !== null && (
              <TranscriptionsSection
                transcriptions={
                  //
                  // Display transcripts with the index provided from the same selected document index
                  documents[selected_document_index].transcriptions
                }
                //
                // Updates the index value
                index={selected_document_index}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyDashboard;
