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
    )
