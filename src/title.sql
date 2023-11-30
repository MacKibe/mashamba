with
    # Compile the images of a document, one for each page
    image as (
        select
            image.document,
            count(image.image) as count,
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
    # Compile the titles to be shown  the documents panel
    title as (
        select
            concat_ws('#', title.id, image.count) as id,
            json_object(
                "category", category.name,
                "pk", document.document,
                "id", document.id,
                "area", document.area,
                "person", document.person,
                "regno", document.regno
            ) as transcriptions,
            image.images as images
        from 
            document
            left join category on document.category=document.document
            left join title on title.document = document.document
            left join image on image.document = document.document
        order by title.id desc 
    ),
result as (
    select
        json_object(
            "id", id,
            "transcriptions", transcriptions,
            "images", images
        ) as documents
    from
        title
)
select
            json_arrayagg(documents) as documents
        from
            result