<?php
//All our php code should places in the mutall namespace. That means that all 
//intername PHP functions must be prefixed with the root namespace 
namespace mutall;
//
try{
    //
    //This file implements the php side of the mashamba class system
    include "../code/mashamba.php";
    //
    //Save the request in an external file (for debugging purposes). 
    //Somebody document: How to debug a PHP file lauched from Javascript using
    //sabve and set request
    mutall::save_requests('request.json');
    //mutall::set_requests('request.json');
    //
    //Create an instance of the mashamba class
    $mashamba = new mashamba();
    //
    //Continue the load files method
    $mashamba->load_images();
    //
    //Test if there were any errors in loading. If any, echo them
    if (\count($mashamba->errors)>0) {
        //
        //Turn the errors to messages
        $msg = \join('<br/><br/>', $mashamba->errors);
        //
        //Report the messages
        echo $msg;
    }    
    //
    //Otherwise echo the 'ok' response for a job well completed
    else echo 'ok';
}catch(\Exception $ex){
    //
    //Output a better error message than the default version
    echo mutall::style_error($ex);
}
