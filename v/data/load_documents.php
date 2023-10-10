<?php
namespace mutall\capture;
//
//Resolve references to the schema library
include '../../../schema/v/code/schema.php';
//
//Resolve reference to the questionnaire class using teh schema library
include '../../../schema/v/code/questionnaire.php';
//
//Define a new questionnaire for uploading data to the mutall_chama database
$q = new \mutall\questionnaire('mutall_mashamba');

//Create the csv table
$cert_of_title_docs = new csv(
        //
        //The name of the text table    
        'cert_of_title_docs',
        //
        //The filename that holds the (milk) data    
        'G:\mutall_projects\mutall_mashamba\v\data\cert_of_title.csv'
);

$layouts = [
    //
    //CSV table layout that is the source of data
    $cert_of_title_docs,
    //
    //Source data table columns TO data model mapping using label layouts
    [new lookup('cert_of_title_docs', 'name'), 'image', 'name'],
    [new lookup('cert_of_title_docs', 'title'), 'document', 'id'],
    [new lookup('cert_of_title_docs', 'folder'), 'folder', 'name'],
    [new lookup('cert_of_title_docs', 'page'), 'page', 'num'],
    [new lookup('cert_of_title_docs', 'url'), 'image', 'url'],
    ['cert_of_title', 'category', 'name'],
    //
    //Scalar mappings to force creation of (abstract) titles and mutations
    [null, 'title', 'title'],
];

echo $q->load_common($layouts);