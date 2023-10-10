<?php
//
//The questionnaire file houses the the class for uploading metadata
include '../../../schema/v/code/questionnaire.php';
//
//Implementation of the php  side iof the mashamba class
class mashamba {
    //
    //The native imagery structure
    public \stdClass $imagery;
    //
    //The files being uploaded
    public array $files;
    //
    //Tracking errors of uploading
    public array $errors = [];
        
    function __construct(){
        //
        //Retrieve the imagery
        $this->imagery = json_decode($_POST['imagery']);
        //
        $this->files = $_FILES['input_file'];
    }
    
    //Load th image content and metadata sent from the client
    function load_images():void{
        //
        // Loop through each uploaded file and save it to the destination folder.
        for ($i = 0; $i < count($this->files["name"]); $i++) $this->load_image($i);
        //
        //Compile the errors for eventual reporting

    }

    //Load the i'th image. This means moving the i'th file to a desired location
    //and saving the metadata to a database
    function load_image(int $i){
        //
        //Get the name of the file
        $name = $this->files["name"][$i];
        //
        //Check if the file was transferred correctly or not
        if($this->files["error"][$i] !== 0) 
            return array_push($this->errors, "File $name was not transferred correctly");
        //
        //Get the source (interface) of the files
        $source = $this->imagery->source;
        //
        //Get the destination folder, depending on the type of the source
        //of the images
        $folder = $source->type==='local_client' ? $source->destination : $source->path;
        //
        //Formulate the url of dthe file (without the local_host prefix)    
         $url= $folder."/".$name;
        //
        //Save the content, if necessary, by moving the file from the temporary 
        //storage to the destination folder
        if ($source->type==='local_client') $this->save_content($url, $name, $i);    
        //
        //Upload the metadata
        $this->upload_metadata($url, $name, $i);
    }
    
    //
    //Save the file content by moving it from the temporary storage to the 
    //destination folder
    function save_content(string $url, string $name, int $i):void{
        //
        //Where to move the file
        $filename = $_SERVER['DOCUMENT_ROOT']."/".$url;
        //
        //Take action depending on whether the file exists or not
        if (file_exists($filename)) $this->take_action($filename, $name, $i);
        //
        //Move the file from temporary storage to the destination unconditionnaly
        else $this->move_file($filename, $name, $i);
    }
    
    //
    //Move the file from temporary storage to the destination
    //N.B. Munya + Kibe
    function move_file(string $filename, string $name, int $i){
        //
        //Get the temp filename from where to move the file
        $source = $this->files["temp_name"][$i];
        //
        //Do the move
        $result /*:boolean*/= move_uploaded_file($source, $filename);
        //
        //Check if the moving was successful or not; if not report error
        if(!$result) $this->errors[]=new Error("File $name not uploaded");
    }
    
    //When a file exists, take action teh appropriate action
    //skipping, overiting or repoting it as an error
    //N.B. Shallon
    function take_action(string $filename, string $name, int $i){
        //
        switch ($this->imagery->action){
            //
            //Skip the file
            case "skip":return;
            //
            //Do not overwrite the file; instead log his as an error
            case "report": return $this->errors[]="File '$filename' already exist";
            //
            //Overwrite the file    
            case "overwrite":$this->move_file($filename, $name, $i);    
        }
    }
    
    //
    //Write the metada of the uploade fils to a database. Proceed by creating 
    //layouts and using the load common method to save the metadata
    function upload_metadata(string $url, string $name, int $i){
        //
        //Retrieve the keyword
        $keyword = $this->imagery->keyword;
        //
        //Retrieve the image source
        $source = $this->imagery->source;
        //
        //Uae the image name as the alias
        $alias = [$name]; 
        //
        //Create the layouts consisting of the url, source,keyword and number
        $layouts =[
            [$url, 'image', 'url', $alias],
            [$keyword, 'image', 'keyword', $alias],
            [$source, 'image', 'source', $alias],
            [$i, 'image', 'number', $alias]
        ];
        //
        //Let $q be a new questionnaire for uploading data to the database
        $q = new \mutall\questionnaire('mutall_imagery');
        //
        //Do the loading
        $result = $q->load_common($layouts);
        //
        //Log the loadding error if any
        if ($result!=='ok') $this->errors[] = new Error($result);
    }
    
    
}
