with
/*
First gather transcription data from the document table
type transcript = {
  title_id: string;
  category: string;
  folder: string;
  regno: number;
  area: number;
  person: string;
};
*/
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
Page cte to group images in documents that have image pages into an object for each document.
The structure of page is defined as:
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
            "page", image.image,
            'num', image.page, 
            'url', image.url
        ) as page
    from
        image
),
/*
    Then organize the images in an object structure.
    type pages = {
        document:pk;
        list:Array<page>;
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
            'document', document.document,
           'pages', pages.pages,
           'transcriptions', transcript.transcript
       ) as doc
    from
        document
	left join pages on pages.document = document.document
	left join transcript on transcript.document = document.document
),

/*
Prepare data about all documents including their titles and categories.
type raw_docs = {
    doc: pk,
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
Aggregate documents with the count of associated documents and their details.
type docs = {
    id:string,
    category:string,
    docs:Array<doc>,
}
*/
docs as (
    select
        id,
        category,
        json_arrayagg(raw_docs.doc) as docs
    from
        raw_docs
    group by 
        id,
        category
),
/*
    Create a structure with title information and associated documents.
    type vtitle = {
        id: string;
        docs: {[category: string]: docs};
    }
*/
vtitle as (
    select
        id,
      json_objectagg(category,docs) as docs
    from
        docs
    group by id
),
vtitles as (
    select
        json_arrayagg(json_object("id",id,"docs",docs)) as vtitles
    from 
        vtitle
)
select * from vtitles