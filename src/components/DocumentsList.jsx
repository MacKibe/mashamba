// 
// Contains the documents from my Mashamba database

export function DocumentsList( {document_data} ){
    return (
        <>
            <div className="DocumentsList">
                <ul>
                    {document_data.map((data, index) =>
                        <li key={index}>{data}</li>
                    )}
                </ul>
            </div>
        </>
    )
}

