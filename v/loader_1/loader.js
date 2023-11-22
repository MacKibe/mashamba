import { mutall_error } from "../../../schema/v/code/schema.js";
import { quiz } from "../../../mlima/v/member/quiz.js";
import { myalert } from "../../../outlook/v/code/view.js";
;
//The load image class takes a void and reurns data that matcje sthe loader 
//interface 
export class loader extends quiz {
    username;
    //
    constructor(username) {
        //
        //Use the custom made html to construct the dialog box
        super("./loader.html");
        this.username = username;
    }
    //The populate method does nothing
    async populate() { }
    //
    //Get the raw data from the form as it is, i.e., allowing for input errors.
    //The data should be collected in levels due to the complexity of the data 
    //entry form. for example:- We collect data of the selected source first to 
    //determine what would be the next envelop used for data collection. This 
    //procedure should be repeated until we are at the lowest level of data  
    //collection
    read() {
        //
        //Get the selected source to determine the envelop to use for data collection
        const selection = this.get_value('source');
        //
        //Ensure that the source was selected
        if (typeof selection !== 'string')
            throw new mutall_error("Please select a source");
        //
        //Initialize the source of the collected data
        const source = this.read_source(selection);
        //
        //Fetch the data from the form (with all its dirt).
        const raw = {
            type: 'imagery',
            source,
            //
            //We have made pprvisios of destination and keyword cannot be empty
            destination: this.get_value("destination"),
            keywords: this.get_keywords(),
            username: this.username,
            dbname: 'mutall_imagery',
            //
            action: this.get_value('action'),
            //
            //Complete the input by adding the date for this uploading; we need to 
            //save it to the database to support retrieval of the immediately 
            //uploaded content
            date: new Date()
        };
        //
        return raw;
    }
    //
    //Collect the source data depending on the user's selection type
    read_source(type) {
        //
        //Compile the source based on the selected option
        switch (type) {
            //
            //When the data collected is from the local client, collect the local files
            case 'local_client': return {
                type,
                destination: this.get_value('destination'),
                //
                //Get files (from the single or multiple file selection) by overriding
                //the default method. N.B. The id is not important
                files: this.get_file_selection()
            };
            //
            //When the data is from digital ocean, provide the full source path
            case 'digital_ocean': return {
                type,
                path: this.get_value('path')
            };
            //
            //When the data is from another server, provide the url
            case 'other_server': return {
                type,
                url: this.get_value('url')
            };
            //
            //Discontinue if the data selected was not in any of the above options
            default: throw new mutall_error(`This source '${type}' is invalid`);
        }
    }
    //Get files (from the single or multiple file selection) by overriding
    //the default method. N.B. The id is not important, so ignore it.
    get_file_selection() {
        //
        //Determine which version of file input we require: single or  multiple file
        //selection
        const version = this.get_value('file');
        //
        //The version is required as a string
        if (typeof version !== 'string')
            return new Error('Select single or multiple file input');
        //
        //The version must be either single or multiple
        if (!['single', 'multiple'].includes(version))
            return Error(`Single or multiple value expexted. '${version}' found`);
        //
        //Get the file that matches the version (using the super method to avoid recursion)
        return this.get_files(version);
    }
    //Returns the captured keywords
    get_keywords() {
        //
        //Get all the unordered list of leywords
        const children = this.get_element('keywords').children;
        //
        //Conver  the collection to an array
        const elements = Array.from(children);
        //
        //Map the elements to their tecxt contemt; sme elememts will may not have
        //text content
        const keywords = Array.from(children).map(element => element.textContent);
        //
        //Return only valid text contents
        return keywords.filter(k => k !== null);
    }
    //Save the content in its entierty handling the reporting(GK,SW,JK,GM)
    //Using the data consider the following cases and use appropriate methods to 
    //save data alongside metadata:-
    //1. Data source is in Digital ocean server(SW)
    //2. Data source is from the client(GM,JK,GK)
    //3. Data is generally on other server(cloud storage), i.e. google photos, 
    //here we only load the url to the database as the only metadata (GK) 
    async execute(input) {
        //
        //Clear the shared error reporting placeholder. 
        this.clear_errors();
        //
        //Create a form for transferring data, i.e., content plus metadata, from 
        //client to server
        const form = new FormData();
        //
        //Append the encoded Imagery input
        form.append("input", JSON.stringify(input));
        //
        //If the source is a local client...
        if (input.source.type === 'local_client')
            //
            //...then add the files to the form
            for (let i = 0; i < input.source.files.length; i++)
                form.append("files[]", input.source.files[i]);
        //
        //Use the form with a post method to get ready to fetch
        const options = { method: "post", body: form };
        //
        //Transfer control to the php side
        const response = await fetch("loader.php", options);
        //
        //Test if fetch was succesful or not; if not alert the user with an error
        if (!response.ok)
            throw new mutall_error(`Fetch request failed. Status code:'${response.status}'. StatusText:'${response.statusText}'`);
        //
        //Get the text that was echoed by the php file
        const result = await response.text();
        //
        //Alert the result
        if (result === "ok")
            return [];
        else
            return [new Error(result)];
    }
    //
    //This version is not designed with targeted error report in mind, so
    //we use a general version that is not targeting the named element
    report_targeted_error(id, error) {
        //
        //Alert the user of this error
        myalert(`Erro '${error.message} occured in '${id}' `);
    }
}
