<?php
//
//The questionnaire file houses the the class for uploading metadata
include '../../../schema/v/code/questionnaire.php';
//
//The schema file is refereneced by the questionnaire
include '../../../schema/v/code/schema.php';
//
//This file implements the php side of the mashamba class
include "mashamba.php";
//
//Create an instance of the mashamba class
$mashamba = new mashamba();
//
//Continue the load files method
$mashamba->load_images();
//
//Give teh ok response for a job well completed
echo 'ok';