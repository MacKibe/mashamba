WITH doc_name_cate AS (
    -- Your doc_name_cate CTE query remains unchanged
    SELECT
        CONCAT(title.id, "::", document.person) AS doc_name,
        JSON_OBJECT(
            'mutation', CASE WHEN COUNT(CASE WHEN category.name = 'mutation' THEN document.document END) > 0 THEN COUNT(CASE WHEN category.name = 'mutation' THEN document.document END) END,
            'title_deed', CASE WHEN COUNT(CASE WHEN category.name = 'title deed' THEN document.document END) > 0 THEN COUNT(CASE WHEN category.name = 'title deed' THEN document.document END) END,
            'certificate_of_lease', CASE WHEN COUNT(CASE WHEN category.name = 'certificate of lease' THEN document.document END) > 0 THEN COUNT(CASE WHEN category.name = 'certificate of lease' THEN document.document END) END,
            'others', CASE WHEN COUNT(CASE WHEN category.name = 'others' THEN document.document END) > 0 THEN COUNT(CASE WHEN category.name = 'others' THEN document.document END) END,
            'certificate_of_title', CASE WHEN COUNT(CASE WHEN category.name = 'certificate of title' THEN document.document END) > 0 THEN COUNT(CASE WHEN category.name = 'certificate of title' THEN document.document END) END,
            'blank', CASE WHEN COUNT(CASE WHEN category.name = ' ' THEN document.document END) > 0 THEN COUNT(CASE WHEN category.name = ' ' THEN document.document END) END,
            'no_record', CASE WHEN COUNT(CASE WHEN category.name IS NULL THEN document.document END) > 0 THEN COUNT(CASE WHEN category.name IS NULL THEN document.document END) END,
            'land_certificate', CASE WHEN COUNT(CASE WHEN category.name = 'land certificate' THEN document.document END) > 0 THEN COUNT(CASE WHEN category.name = 'land certificate' THEN document.document END) END
        ) AS category_count
    FROM
        document
    INNER JOIN 
        title ON document.document = title.document
    LEFT JOIN 
        category ON document.category = category.category
    GROUP BY
        doc_name
),
doc_images AS (
    -- Your doc_images CTE query remains unchanged
    SELECT
        document,
        COUNT(image.image) AS count,
        JSON_ARRAYAGG(JSON_OBJECT(
            'num', image.page,
            'url', image.url,
            'name', image.name
        )) AS images
    FROM
        image
    GROUP BY
        document
),
doc_transcription AS (
    -- Your doc_transcription CTE query remains unchanged
    SELECT
        JSON_OBJECT(
            'category', category.name,
            'pk', document.document,
            'id', document.id,
            'area', document.area,
            'person', document.person,
            'regno', document.regno
        ) AS transcriptions
    FROM
        document
    LEFT JOIN category ON document.category = category.category
    LEFT JOIN title ON title.document = document.document
    ORDER BY title.id DESC
),
results AS (
    SELECT distinct
     *
    FROM
	 doc_name_cate,
	 doc_images,
     doc_transcription
    LIMIT 1000
)
SELECT * FROM results;
