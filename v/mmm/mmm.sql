-- Formulate the office query in 3 parts: images, documents, and transcription
with
    # Compile the images of a document, one for each page
    images as (
        select
            image.document,
            json_arrayagg(json_object(
                'num', image.page, 
                'url', image.url, 
                'name', image.name
            )) as images
        from image
        group by
            document
    ),
    #
    # Compile the contents for the transcriptions panel
    transcriptions as (
        select
            document.document,
            json_object(
                "id", document.id,
                "person", document.person,
                "area", document.area,
                "regno", document.regno,
                "folder", folder.name
            ) as transcriptions
        from 
            document
            inner join folder on document.folder = folder.folder
    ),
    #
    # Compile the list for the documents panel
    documents as (
        select
            json_object(
                "id", document.id,
                "images", images.images,
                "transcriptions", transcriptions.transcriptions
            ) as documents
        from 
            document
            left join images on images.document = document.document
            inner join transcriptions on transcriptions.document = document.document
    )