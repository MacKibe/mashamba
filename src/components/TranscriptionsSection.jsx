const TranscriptionsSection = ({ transcriptions }) => {
  return (
    <>
      <div className="TranscriptionsSection">
        <h2>Document Details.</h2>
        <p>Id: {transcriptions.id}</p>
        <p>Area: {transcriptions.area}</p>
        <p>Regno: {transcriptions.regno}</p>
        <p>Person: {transcriptions.person}</p>
        <p>Category: {transcriptions.category}</p>
      </div>
    </>
  );
};

export default TranscriptionsSection;
