/*
Isolate clean from dirty titles
*/
with
    # 1. Isolate all unique virtual titles,  regardless of their status, i.e., clean or 
    #dirty
    vtitle as (
        select distinct
            id
        from
            title
        order by
            id asc
        ),
  # Count the virtual titles
  vtitle_count as (
    select
        count(id) as num
    from
        vtitle
    ),

# 2. Isolate scanned titles

#2.1 categorised virtual titles
categorised as (
    select distinct
        title.id,
        category.name
    from
        title
        inner join document on title.document = document.document
        inner join category on document.category=category.category
),
#Count of categorised titles
catcount as (
    select count(1) from categorised
),

#List the categpries of the titles
categories as (
    select
        name as category,
        count(id) as counts
    from
        categorised
    group by
        name
)

# 3. Isolate scanned mutations
select * from categories;