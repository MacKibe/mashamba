// 
// 
import './ImagesSection.css'

function ImagesSection({images}){
    // 
    // Get images for the one document
    const document_images = Object.values(images)[0];
    return(
        <>
            <div className="image_component">
                <li>
                    <p>Page:{document_images.num}</p>
                    <img src={document_images.url} alt={document_images.name}/>
                    <p>{document_images.name}</p>
                </li>
            </div>
        </>
    )
}

export default ImagesSection