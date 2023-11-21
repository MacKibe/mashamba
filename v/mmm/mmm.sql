-- Formulate the office query in 3 parts: images, documents, and transcription
with
    # List the available categories by document counts
    # The structure of a single record is:-
    # {category:pk, name:string, counts}
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
    
    # The type of this output is asingle record of the form:-
    # type categories = Array<category>
    #where 
    # type category = {pk:number, name:string, documents:number}
    report_category as (
        select
            json_arrayagg(
                json_object(
                    "pk", category,
                    "name", name,
                    "documents", counts
                )
            ) as category
        from 
            list_category
    ),

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