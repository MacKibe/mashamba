//Access the server services by importing all the facilities that are in the
//server module in the schema foler of our library
import * as server from "../../../schema/v/code/server.js";
//
//Import the registration library.
//Access the registration services from the registration class
import { registration } from "../../../registration/v/code/registration.js";
//
//Access to Page class of our library
import * as view from "../../../outlook/v/code/view.js";
import { mutall_error } from "../../../schema/v/code/schema.js";
//
//Import the dialog class to help with collection of input from the user
import { dialog } from "./dialog.js";
;
//
//Extend the page class with our own version, called mashamba
export class mashamba extends view.page {
    //
    //Declare the elements of interests
    //
    //The image element in in the panel one
    first_page;
    //
    //This is the panel that represents the other pages of the document
    other_pages;
    //
    //The couner for documents being displayed
    counter = 0;
    //
    //The results of interrogating the database is an array of documents
    docs;
    //
    //An instance of the registration that will help in logging in and out
    static register;
    //
    //
    constructor() {
        super();
        //
        //intialize the page one panel
        this.first_page = document.getElementById("first_page");
        //
        //intialize the other pages panel
        this.other_pages = document.getElementById("other_pages");
        //
        // Attach an event listener for moving to the document
        document.getElementById("nxt_btn").onclick = () => this.move_next();
        //
        // Attach an event listener for moving to the document
        document.getElementById("previous_btn").onclick = () => this.move_previous();
        //
        // Attach an event listener for saving the transcriptions
        document.getElementById("save_data_btn").onclick = () => this.save();
        //
        //Create an instance of the registration for signing in and out opreations
        mashamba.register = new registration();
    }
    //
    //Replace the show pannels method with our own version
    async show_panels() {
        //
        //Load documents
        this.docs = (await server.exec("database", ["mutall_mashamba", false], "get_sql_data", ["/mashamba/v/code/mashamba.sql", "file"]));
        //
        //Load the current title
        this.load_title();
    }
    //
    //Upload files to a server and save the metadata to a database. The anchor is
    //where to hook the input dialog
    async load_images(anchor) {
        //
        //Create a new instance of the load images dialog
        const dlg = new load_images(anchor);
        //
        //Wait for the user to click either save or cancel button and when they
        //do return the imagery or undefined(JM,SW,JK,GK,GM)
        const result = await dlg.administer();
        //
        //Update the home page (i.e., show the fist image loaded, ready for
        //transcripion) if the loading was successful(JK)
        if (result !== undefined)
            this.update_home_page(result);
    }
    //
    // this will help in moving to next document
    move_next() {
        //
        // Check if there are any empty required fields before moving to the next document
        if (this.areRequiredFieldsEmpty()) {
            alert("Please fill all required fields before moving to the next document.");
            return;
        }
        //
        // Increate the counter by 1
        this.counter++;
        // Load tthe titles using the new counter
        this.load_title();
    }
    //
    // Checking if fields are empty
    areRequiredFieldsEmpty() {
        //
        // Define an array of keys for the required fields
        const requiredKeys = [
            "document",
            "title_no",
            "category",
            "area",
            "owner",
            "regno",
        ];
        //
        // Loop through the required keys and check if any of the corresponding input fields are empty
        for (const key of requiredKeys) {
            const element = document.getElementById(key);
            if (!element.value.trim()) {
                return true;
            }
        }
        return false;
    }
    //
    // this will help in moving to next document
    move_previous() {
        //
        // Increate the counter by 1
        this.counter--;
        // Load tthe titles using the new counter
        this.load_title();
    }
    //
    // Load the current document to the home page depending
    async load_title() {
        //
        // Clear all the 3 panels, viz., first_page, other_pages and transcription
        this.clear_panels();
        //
        // Get the pages of the given current document number
        const pages = JSON.parse(this.docs[this.counter].pages);
        //
        // Create the first page, including its image
        this.create_first_page(pages[0]);
        //
        // Fill the transcription panel
        for (const key of [
            "document",
            "title_no",
            "category",
            "area",
            "owner",
            "regno",
        ])
            this.fill_transcriptions(key);
        //
        // Create and show the other_pages panel
        for (let i = 1; i < pages.length; i++)
            this.create_other_page(pages[i]);
    }
    //
    // Set the url of the first image of the pages
    create_first_page(page) {
        //
        // Get url of of the first page
        const url = page.url;
        //
        // Create the first page image
        const image1 = document.createElement("img");
        //
        // Add a class to the image
        image1.classList.add("image");
        //
        // Attach the image to page1
        this.first_page.appendChild(image1);
        //
        // Add event listener to change border color when clicked
        image1.addEventListener("click", () => {
            image1.classList.toggle("imgSelected");
        });
        //
        // Set the url of the page
        image1.src = `http://localhost${url}`;
    }
    //
    //
    create_other_page(page) {
        //
        // Create an image element for this page
        const image = document.createElement("img");
        //
        // Add a class to the image
        image.classList.add("image");
        //
        // Set the source of the image to the URL of the page
        image.src = `http://localhost${page.url}`;
        //
        // Add event listener to change border color when clicked
        image.addEventListener("click", () => {
            image.classList.toggle("imgSelected");
        });
        //
        // Attach the image element to the other-pages div element
        this.other_pages.appendChild(image);
    }
    //
    //clear all the 3 panels
    clear_panels() {
        //
        // Clear the first page
        this.first_page.innerHTML = "";
        //
        // Clear the other_pages panels
        this.other_pages.innerHTML = "";
        //
        // Clear all the inputs of the transcription panel, by looping over all
        // the keys of a document, except the pages key
        /*
                        document:string,
                            pages:string,
                            title_no:string,
                            category:string,
                            area:number,
                            owner:string,
                            regno:string
                        */
        for (const key of [
            "document",
            "title_no",
            "category",
            "area",
            "owner",
            "regno",
        ]) {
            //
            // Skip the pages key (because it is a special key)
            if (key === "pages")
                continue;
            //
            // Get the named element
            const element = document.getElementById(key);
            //
            // Se its value to empty
            element.value = "";
        }
    }
    //
    // Fill the transcriptions, by transferring the values from from the global
    // array, data array to
    // the transciption panel
    fill_transcriptions(key) {
        //
        //Skip the pages key (because it is a special key)
        if (key === "pages")
            return;
        //
        //Get the named element
        const element = document.getElementById(key);
        //
        //Get the value that maches the key
        const value = this.docs[this.counter][key];
        //
        //Set the element vale only if the value is not null
        if (value !== null)
            element.value = String(value);
    }
    //
    //
    // Get the transcription data {including the current logged in intern) from
    // the input form then save them to various
    // tables in the mutall_mashamba database
    async save() {
        //
        //Collect the data to save, as layouts
        //
        //Get the ids of the html elements that have the data
        const ids = {
            document: ["document", "id"],
            title_no: ["title", "id"],
            category: ["category", "name"],
            area: ["document", "area"],
            owner: ["document", "person"],
            regno: ["document", "regno"],
            surname: ["intern", "surname"],
        };
        //
        //The elements will now be mapped to their layouts
        const layouts = Object.keys(ids).map(async (k) => await this.get_layout(k, ids));
        //
        //Use questionnaire to save the data and get the results
        const result = await server.exec(
        //
        //The name of the PHP class to use is questionnaire
        "questionnaire", 
        //
        //The constructor parameter of questionnare is one: database name
        ["mutall_mashamba"], 
        //
        //The name of the questionnare method to use is the common lodig system
        "load_common", 
        //
        //The mandory parameter of the load commom method is one: layput
        [layouts]);
        //
        //Report the result.
        alert(result);
    }
    //
    // k is the id used to label the input elements in the form
    async get_layout(k, ids) {
        //
        //Coerce k into of of the document keys
        const key = k;
        //
        //Define a string value
        let value;
        //
        //If the key is a surname use the reg system to get the intern logged in
        if (key === "surname")
            value = await this.get_current_intern();
        else
            value = document.getElementById(key).value;
        //
        //Show the entity name where the data will be saved in the database
        const ename = ids[key][0];
        //
        //Show which column in the database the value will be saved
        const cname = ids[key][1];
        //
        //Get the values ready for saving
        return [value, ename, cname];
    }
    //
    // If there is no currently logged in user we kick in the Joshua's registration system.
    // The underline Db must support one or 2 users types this content generator eg Divan
    // and transcriber.
    // The key is a surname use the reg system to get the intern logged in.
    // String is the actual surname of the user logged in.
    async get_current_intern() {
        //
        // Let surname be the result we want.
        let surname;
        //
        // Use windows local storage to get the currently logged in intern.
        surname = localStorage.getItem("userfullname");
        //
        // If no user is logged in use the registration class to get the user
        if (surname === null)
            surname = await this.get_user_from_registration_system();
        //
        // Take the fact that the user may not be active and the registartion system was aborted.
        // chack how to stop a process without using a method.
        if (surname === null)
            throw new mutall_error("I am unable to determine the current user");
        //
        // Return the username.
        return surname;
    }
    //
    // Use the registration class to get the user.
    async get_user_from_registration_system() {
        //
        // Administer the pop up to get the user
        // User data type is found in the app.ts file of outlook
        const user = await mashamba.register.administer();
        //
        // Return the user name
        if (user)
            return user.name;
        //
        // If user is undefined return null
        return null;
    }
}
//
class load_images extends dialog {
    //
    constructor(anchor) {
        //
        //Initializing the parent class without any input data.
        super({ url: "./load_images.html", anchor });
    }
    //
    //Get the raw data from the form as it is, i.e., allowing for input errors.
    //The data should be collected in levels due to the complexity of the data 
    //entry form. for example:- We collect data of the selected source first to 
    //determine what would be the next envelop used for data collection. This procedure
    //should be repeated untill we are at the lowest level that is till we finished all
    //the data collection
    async read() {
        //
        //Get the selected source to determine the envelop to use for data collection
        const selection = this.get_value('source');
        //
        //Ensure that the source was selected
        if (typeof selection !== 'string')
            throw new mutall_error("Please select a source");
        //
        //Initialize the source of the collected data
        let source = this.read_source(selection);
        //
        //Fetch the data from the form.
        const raw = {
            type: "imagery",
            source,
            destination: this.get_value("destination"),
            keywords: this.get_value("keyword"),
            contributor: await this.get_intern_pk(),
            dbname: 'mutall_imagery',
            //
            action: this.get_value('action'),
            //
            //Complete the input by adding the date for this uploading; we need to 
            //save it to the datanase for retrievel of the immediately uploaded content
            date: this.standardise_date(new Date())
        };
        //
        return raw;
    }
    //
    //Collect the source data depending on the user's selection
    read_source(selection) {
        //
        //Compile the source based on the selected option
        switch (selection) {
            //
            //When the data collected is from the local client
            case 'local_client': return {
                type: selection,
                //
                //TODO:Extend get value to take care of filelist
                files: this.get_files('files')
            };
            //
            //When the data is from digital ocean
            case 'digital_ocean': return {
                type: selection,
                path: this.get_value('path')
            };
            //
            //When the data is from another server
            case 'other_server': return {
                type: selection,
                url: this.get_value('url')
            };
            //
            //Discontinue if the data selected was not in any of the above options
            default: throw new mutall_error(`This source '${selection}' is invalid`);
        }
    }
    //
    //Get the primary key of the currently logged in intern
    //
    //We first check using the instance of the registration if there is any logged in intern
    //If there is an inter we return the primary key of the user else we initiate the registration process
    async get_intern_pk() {
        //
        //Check if there is any intern/user logged in
        let user = mashamba.register.get_current_user();
        //
        //Return the pk of the currently logged in user if a user exists
        if (user)
            return user.pk;
        //
        //If no user exist initiate the log in sequence
        user = await mashamba.register.administer();
        //
        //Check if the log in process was successful or aborted and return an error while reporting
        //if it was aborted otherwise return the primary key of the user
        if (!user)
            this.report_error("report", "We need to know who is uploading the images");
        //
        return user
            ? user.pk
            : new Error("We need to know who is uploading the images");
    }
    //
    //???????????Investigate on suitable return type rather than an ok???????
    //
    //Save the content in its entierty handling the reporting(GK,SW,JK,GM)
    //Using the data consider the following cases and use appropriate methods to 
    //save data alongside metadata:-
    //1. Data source is in Digital ocean server(SW)
    //2. Data source is from the client(GM,JK,GK)
    //3. Data is generally on other server(cloud storage), i.e. google photos, 
    //here we only load the url to the database as the only metadata (GK) 
    async save(input) {
        //
        //Create a form for transferring data, i..e, content plus metadata, from 
        //client to server
        const form = new FormData();
        //
        //Append the encoded Imagery input
        form.append("imagery", JSON.stringify(input));
        //
        //Transfer content to the server, if necessary, by appending the image files
        if (input.source.type === 'local_client')
            this.save_content(input.source.files, form);
        //
        //Use the form with a post method to get ready to fetch
        const options = { method: "post", body: form };
        //
        //Transfer control to the php side
        const response = await fetch("./load_images.php", options);
        //
        //Test if fetch was succesful or not; if not alert the user with an error
        if (!response.ok)
            throw "Fetch request failed...for some reason.";
        //
        //Get the text that was echoed by the php file
        const result = await response.text();
        //
        //Alert the result
        if (result === "ok")
            return "ok";
        else
            return new Error(result);
    }
    //
    //Transfer content to a form for onward transmission to teh server
    save_content(files, form) {
        //
        // Add the files for sending to the server
        for (let i = 0; i < files.length; i++)
            form.append("input_file[]", files[i]);
    }
}
