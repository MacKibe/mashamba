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

//Constructit the file scanner by extemding capture\table
class scanner extends table{
    //
    //The path from where the scanning starts
    public string $home;
    
    function __construct(string $tname, string $path){
        parent::__construct($tname);
        $this->home=$path;
    }
    //
    //
    function get_header_columns(): array /* <cname> */{
        return ['document_id', 'folder_name', 'image_name', 'page_num', 'image_url'];
    }
    
    //
    //Return a row of data as an 1-d array, or false if at the end of the 
    //stream
    function read(): \Generator/* array<basic_value>|false */{
        //
        //Yield all the files from this home directory and all the subdirectories 
        //there under
        yield from $this->scan("");
    }
    
    function scan(string $dir):\Generator /*Array<string>|false*/{
        //
        //
        //Complete the scanning pathpath
        $path = $_SERVER['DOCUMENT_ROOT'].$this->home.$dir;
        //
        //Easy way to get rid of the dots that scandir() picks up in Linux environments:
        $scan_indexed = array_diff(scandir($path), ['..', '.']);
        //
        //The array diff seems to return an indxed array -- which gets mapped to
        //another indexed array. Such an array resurfaces as a json object, 
        //rather than an array -- with unintended consequences. Hakikisha that
        //only array valuse are considederd
        $names= array_values($scan_indexed); 
        //
        //To support page numbering set a counter to start from 1
        $pageno = 1;
        //
        //For each entry...
        foreach($names as $name){
            //
            //Compile the full path to check whether its a folder or not
            $full_path = "$path/$name";
            //
            //If the entry is a file yield the mashamba details. 
            if (\is_file($full_path)){
                //
                //The directory has the following structure: /$folder/$no
                list($empty, $folder, $no) = \explode('/', $dir);
                //
                //The document id is made of $folder/$no.
                //The folder is the 2nd component after the split
                //The name is that of the image.
                $url = "$this->home/$dir/$name";
                yield ["$folder/$no", $folder, $name, $pageno, $url];
                //
                //Increase the page counter
                $pageno++;
            }
            //
            //Otherwise re-run the scan with a new dir
            else{
                yield from $this->scan("$dir/$name");
            }
        }
    }
}

$layouts = [
    new scanner('files', '/mutall_mashamba/v/images'),
    [new lookup('files', 'document_id'), 'document', 'id'],
    [new lookup('files', 'folder_name'), 'folder', 'name'],
    [new lookup('files', 'image_name'), 'image', 'name'],
    [new lookup('files', 'page_num'), 'image', 'page'],
    [new lookup('files', 'image_url'), 'image', 'url']
];

echo $q->load_common($layouts);
