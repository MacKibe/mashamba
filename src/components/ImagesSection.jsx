// 
// 
import './ImagesSection.css'


function ImagesSection({images}){// 
    // Get images for the one document
    const document_images = Object.values(images)[0];
    return(
        <>
            <div className="ImagesSection">
                <li>
                    <p>Page:{document_images.num}</p>
                    <img src={document_images.url} alt={document_images.name}/>
                </li>
            </div>
        </>
    )
}

export default ImagesSection