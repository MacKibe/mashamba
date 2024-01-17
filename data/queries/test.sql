with

transcript as (
    select
        document,
        json_object(
            'title_id', id,
            'category', category.name,
            'folder', folder.name,
            'regno', regno,
            'area', area,
            'person', person
        ) as transcript
    from
        document
        inner join category on document.category = category.category
        inner join folder on document.folder = folder.folder
),
/*
    1.2 Then group the images in documents the have the images pages in an object for each document.\
The structure of page 
type page = {
  page: pk;
  url: string;
  num: number;
};
*/
page as (
    select
        document,
        json_object(
            'num', image.page, 
            'url', image.url
        ) as page
    from
        image
),
/*
    have the images in an object structure
    type pages = {
        document:pk;
        pages:Array<page>;
    }
*/
pages as (
    select
        document,
        json_arrayagg(page) as pages
    from
        page
    group by 
        document
),
/*
    2. Now i want to join both the images and the trascription
    Below is the structure of my doc
    type doc = {
        document: pk;
        pages: Array<page>;
        transcriptions: transcription;
};
*/
doc as (
    select
       document.document,
       json_object(
           'pages', pages.pages,
           'transcriptions', transcript.transcript
       ) as doc
    from
        document
	left join 
            pages on pages.document = document.document
	left join 
            transcript on transcript.document = document.document
),

/*
type all_docs = {
    document: pk,
    id:string,
    category:string
}
*/
raw_docs as (
    select
        if (title.id is null, document.id, title.id) as id,
        if (category.name='title deed', 'title',if(category.name='mutation', 'mutation', 'other')) as category,
        doc.doc
    from 
        document
        left join title on title.document = document.document
        left join category on document.category=category.category
        left join doc on doc.document = document.document
),

/*
type docs = {
    id:string,
    category:string,
    docs:Array<doc>,
}
*/
agg_docs as (
    select
        id,
        category,
        count(doc) as count,
        json_arrayagg(raw_docs.doc) as list
    from
        raw_docs
    group by 
        id,
        category
),

docs as (
    select
        id,
        category,
        json_object(
            'count', count,
            'list', list
        ) as docs
    from 
        agg_docs
),
/*
    type vtitle = {
        id:string;
        docs:{[category:string]:docs};
    }
*/


vtitle as (
    select
        id,
      json_object('category', category, 'docs', docs) as vtitle
    from
        docs
)

select * from vtitle;