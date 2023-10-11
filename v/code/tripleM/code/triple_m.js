// Access the server services by importing all the facilities that are in the
//server module in the schema foler of our library
import * as server from "../../../../../schema/v/code/server.js";
//
// Access to Page class of our library
import * as view from "../../../../../outlook/v/code/view.js";
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
    async load_documents() {
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
        const documents = await server.exec('database', ['mutall_mashamba'], 'get_sql_data', [sql]);
        // 
        // Get reference to the documents panel
        const doc_list = document.getElementById('doc_list');
        // 
        // Append the list of documents to each li element
        documents.forEach(document => {
            // 
            // Create a list element
            const the_li_element = this.document.createElement('button');
            // 
            // Add the value to the li elements
            the_li_element.innerHTML = `${document.num}: ${document.name}`;
            // 
            // Append this values to the ul
            doc_list.appendChild(the_li_element);
        });
    }
    ;
}
//
// Displays the images and the transcription when document is selected.
// selected_document() {}
//
// Gets all the images of the documents when a specific document is selected.
// display_images_documents() {}
//
// Fill in the transcriptions when document is selected
// fill_transcriptions() {}
//}
