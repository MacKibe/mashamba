with
    all_docs as (
        select
            document.document,
            if (title.id is null, document.id, title.id) as id,
            if (category.name='title deed', 'title',if(category.name='mutation', 'mutation', 'other')) as category
        from 
            document
            left join title on title.document = document.document
            left join category on document.category=category.category
    ),
    doc_cat as (
        select
            id,
            category,
            count(document) as count
        from
            all_docs
        group by id, category
    ),
    x as (
        select
            id,
            json_objectagg(category, count) as a,
            json_arrayagg(json_object('category', category, 'count', count)) as b
        from
            doc_cat
        group by id
    ),

z as (
    select 
        id,
        a->>'$."title deed"' as title,
        a->>'$.mutation' as mutation,
        a->>'$.others' as others

    from 
        x
)

select * from z;