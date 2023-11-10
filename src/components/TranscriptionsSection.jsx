function TranscriptionsSection({transcrptions}){
    return(
        <>
            <div className="TranscriptionsSection">
                <p>id{transcrptions.id}</p>
                <p>area{transcrptions.area}</p>
                <p>regno{transcrptions.regno}</p>
                <p>person{transcrptions.person}</p>
            </div>
        </>
    )
}

export default TranscriptionsSection