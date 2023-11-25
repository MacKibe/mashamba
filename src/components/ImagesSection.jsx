//
//

function ImagesSection({images}) {
  return (
    <>
      <div className="image_component">
        <h2>Document Pages</h2>
        <ul>
          {images.map((image, index) => (
            <li key={index}>
              <p>Page: {image.num}</p>
              <img src={image.url} alt={image.name} />
              <p>{image.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ImagesSection;
