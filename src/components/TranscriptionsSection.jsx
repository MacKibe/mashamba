const TranscriptionsSection = ({transcriptions}) => {
    return(
        <>
            <div className="TranscriptionsSection">
                <p>id: {transcriptions.id}</p>
                <p>area: {transcriptions.area}</p>
                <p>regno: {transcriptions.regno}</p>
                <p>person: {transcriptions.person}</p>
            </div>
        </>
    )
}

export default TranscriptionsSection