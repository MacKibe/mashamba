# Set the desired type of documents
set @category='mutation';

# Formulate the office query in 3 parts: images, documents, and transcription
with
    # Compile the CTE for driving the images panel
    images as (
        select
            image.document,
            json_arrayagg(json_object('num', image.page, 'url', image.url, 'name', image.name)) as images
        from image
        group by
            document
    ),
    # Compile the CTE for driving the documents panel
    documents as (
        select
            document.document,
            #
            # A visible link for driving the documents panel
            concat_ws("/", document.id, person, area) as documents
        from document
            inner join image on image.document = document.document
            inner join folder on document.folder = folder.folder
    ),
    
    # Compile the CTE for driving the transcription panel
    transcription as (
        select
            document.document,
            json_object(
                "id", id,
                "area", area,
                "person", person,
                "regno", regno
            ) as transcriptions
        from document
    ),
    #
    # Compile the CTE for presenting the office
    office as (
        select
            document.document,
            images.images,
            documents.documents,
            transcription.transcriptions
        from 
            document
            inner join category on document.category = category.category
            left join images on images.document = document.document
            inner join documents on documents.document = document.document
            inner join transcription on transcription.document = document.document
        where category=@category
    )    
select * from images;