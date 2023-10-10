// Access the server services by importing all the facilities that are in the
//server module in the schema foler of our library
import * as server from "../../../schema/v/code/server.js";
//
// Access to Page class of our library
import * as view from "../../../outlook/v/code/view.js";
//
// Extend the page class with our own version, called mashamba
export class triple_m extends view.page {
    //
    // Declare the elements of interests
    //
    // This is the images panel where the documents will be displayed
    images_section;
    //
    // This is the panel that represents the transcripts of the documents.
    transcription_section;
    //
    // This is the side panel that represents shows the folders of the documents.
    folder_section;
    //
    //The couner for documents being displayed
    counter = 0;
    //
    // The results of interrogating the database is an array of documents
    docs;
    //
    // Here we now intialiaze the components we declared
    constructor() {
        super();
        //
        // the image panel
        //
        this.images_section = document.getElementById("images_section");
        // the transcript panel
        //
        this.transcription_section = document.getElementById("transcription_section");
        //
        // the folder panel
        this.folder_section = document.getElementById("folder_section");
        //
        //
    }
    //
    // Show the panels i.e image, transcription and the folders panel.
    async show_panels() {
        //
        // Load documents from the database
        this.docs = await server.exec("database", ["mutall_mashamba", false], "get_sql_data", ["/mashamba/v/code/mashamba.sql", "file"]);
        //
        // Load all the documenst in the
        this.load_first_page_of_the_documents();
    }
    //
    // Get the documents and their page.url
    load_first_page_of_the_documents() {
        //
        // Get the pages of the given current document number
        const pages = JSON.parse(this.docs[this.counter].pages);
        //
        // Create the first page, including its image
        this.display_the_documents(pages[0]);
    }
    display_the_documents(page) {
        //
        // Get url of of the first page
        const url = page.url;
        //
        // Create the first page image
        const image1 = document.createElement("img");
        //
        // Add a class to the image
        image1.id = "first_page_image";
        //
        // Attach the image to page1
        this.images_section.appendChild(image1);
        //
        // Set the url of the page
        image1.src = `http://localhost${url}`;
    }
}
