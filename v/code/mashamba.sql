select 
    folder.name as folder,
    document.id as document,
    json_arrayagg(json_object('num', image.page, 'url', image.url, 'name', image.name)) as pages,
    title.id as title_no,
    category.name as category,
    document.area as  area,
    document.person as owner,
    document.regno as regno
from image
    inner join document on image.document = document.document
    inner join folder on document.folder = folder.folder
    left join title on document.document = title.document
    left join category on document.category = category.category
WHERE title.id
    is not null
group by
    document.document;