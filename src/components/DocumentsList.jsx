// 
// Contains the documents from my Mashamba database

function DocumentsList(){

    return(
        <>
            <div className="DocumentsList">
                <ul>
                    {Object.values(document_data).map((data, index) =>
                        <li key={index}>{data}</li>
                    )}
                </ul>
            </div>
        </>
    )
}

export default DocumentsList