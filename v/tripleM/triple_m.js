// Access the server services by importing all the facilities that are in the
//server module in the schema foler of our library
import * as server from "../../../../../schema/v/code/server.js";
//
// Access to Page class of our library
import * as view from "../../../../../outlook/v/code/view.js";
//
//
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
    documents_section;
    //
    // Here we now intialiaze the components we declared
    constructor() {
        super();
        //
        // the image panel
        this.images_section = document.getElementById("images_section");
        //
        // the transcript panel
        this.transcription_section = document.getElementById("transcription_section");
        //
        // the folder panel
        this.documents_section = document.getElementById("documents_section");
    }
    //
    // Lists all the documents from the database
    async load_documents(criteria) {
        //
        // Get the documents using a query
        const sql = `
      select
        document.document,
        #
        # A visible link for driving the documents panel
        concat_ws("/", document.id, person, area) as documents
      from document
        inner join image on image.document = document.document
        inner join folder on document.folder = folder.folder
    `;
        //
        //  Excecute the sql
        const documents = await server.exec("database", ["mutall_mashamba"], "get_sql_data", [sql]);
        //
        // Get reference to the documents panel
        const doc_list = document.getElementById("doc_list");
        //
        // Append the list of documents to a button element
        documents.forEach((document) => {
            //
            // Create a button element
            const doc_button = this.document.createElement("button");
            //
            // Give an id to the button.
            doc_button.id = "doc_btn";
            //
            // Add the value to the button elements
            doc_button.innerHTML = `${document.num}: ${document.name}`;
            //
            // Append this values to the button
            doc_list.appendChild(doc_button);
            // 1. Add event listener to the button when its clicked it shows images of the specific document
            // and its transcription.
            doc_button.onclick = () => {
                // 
                // Display images.
                this.display_images();
                // 
                // Display transcripts of the document.
                this.fill_transcriptions();
            };
        });
    }
    //
    // Display images of the documents when a specific document is selected.
    display_images() {
        //
        // Get the images
        //
        // Execute the sql
        //
        // Get reference to the images panel
        //
        // Append the images to the images panel
    }
    //
    // Fill in the transcriptions when document is selected
    fill_transcriptions() { }
}
//}
