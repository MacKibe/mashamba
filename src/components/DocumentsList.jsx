//
// Contains the documents from my Mashamba database

const DocumentsList = ({document}) => {
  return (
    <div className="DocumentsList">
      <p><span>{document.pk}. </span><span>{document.name_of_document}</span></p>
    </div>
  );
};

export default DocumentsList;
