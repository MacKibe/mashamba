# Set the desired type of documents
set @category='mutation';

# Formulate the office query in 3 parts: images, documents, and transcription
with
    #List the available categories by document counts
    list_category as (
        select 
            category.category,
            category.name,
            count(document.document) as counts
        from category
            inner join document on document.category=category.category
        group by 
            category.category, 
            category.name    
    ), 
    
    #The type of this output is:=
    # type categories = Array<category>
    # type category = {pk:number, name:string, documents:number}
    report_category as (
        select
            json_arrayagg(
                json_object(
                    "pk", category,
                    "name", name,
                    "number_of_documents", counts
                )
            ) as category
        from 
            list_category
    ),

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
    document as (
        select
                json_object(
                    "pk", document.document,
                    "images", images.images,
                    "name_of_document", documents.documents,
                    "transcrption", transcription.transcriptions
                ) x
        from 
            document
            inner join category on document.category = category.category
            left join images on images.document = document.document
            inner join documents on documents.document = document.document
            inner join transcription on transcription.document = document.document
        limit 10
    ),
    
    office as (
        select
            json_arrayagg(x) as office
        from
            document
    )
select * from office;