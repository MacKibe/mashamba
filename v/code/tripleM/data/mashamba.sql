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
        SELECT
    document.document,
    CONCAT_WS("/", document.id, person, area) AS documents
FROM document
INNER JOIN image ON image.document = document.document
INNER JOIN folder ON document.folder = folder.folder
WHERE document.document IN (
    SELECT document.document
    FROM document
    INNER JOIN image ON image.document = document.document
    INNER JOIN folder ON document.folder = folder.folder
    GROUP BY document.document
    LIMIT 1
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
SELECT * FROM documents;