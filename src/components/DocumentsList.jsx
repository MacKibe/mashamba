//
// Contains the documents from my Mashamba database
import './DocumentsList.css'

const DocumentsList = ({name_of_document}) => {
  return (
    <div className="DocumentsList">
      <p>{name_of_document}</p>
    </div>
  );
};

export default DocumentsList;
