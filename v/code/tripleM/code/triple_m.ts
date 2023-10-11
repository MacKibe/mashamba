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
  public images_section: HTMLElement;
  //
  // This is the panel that represents the transcripts of the documents.
  public transcription_section: HTMLElement;
  //
  // This is the side panel that represents shows the folders of the documents.
  public documents_section: HTMLElement;
  //
  // Here we now intialiaze the components we declared
  constructor() {
    super();
    //
    // the image panel
    this.images_section = document.getElementById("images_section")!;
    //
    // the transcript panel
    this.transcription_section = document.getElementById(
      "transcription_section"
    )!;
    //
    // the folder panel
    this.documents_section = document.getElementById("documents_section")!;
  }
  //
  // Lists all the documents from the database
  public async load_documents(): Promise<void> {
    // 
    // Get the documents using a query
    const sql: string = `
      select
        document.document,
        #
        # A visible link for driving the documents panel
        concat_ws("/", document.id, person, area) as documents
      from document
        inner join image on image.document = document.document
        inner join folder on document.folder = folder.folder
    `
    // 
    //  Excecute the sql
    const documents: Array<{ num: string, name: string }> = await server.exec(
      'database',
      ['mutall_mashamba'],
      'get_sql_data',
      [sql]
    );
    // 
    // Get reference to the documents panel
    const doc_list = <HTMLElement>document.getElementById('doc_list');
    // 
    // Append the list of documents to each li element
    documents.forEach(document => {
      // 
      // Create a list element
      const doc_button = this.document.createElement('button');
      // 
      // Give id to the buttons.
      doc_button.id = 'doc_btn';
      // 
      // Add the value to the li elements
      doc_button.innerHTML = `${document.num}: ${document.name}`;
      // 
      // Append this values to the ul
      doc_list.appendChild(doc_button);
      // 1. Add event listener to the button when its clicked it shows images of the specific document 
      // and its transcription.
      doc_button.onclick = () => this.display_images_and_transcripts();
    });
  };
  // 
  // Now that the documents are displayed lets display the images and their transcripts
  display_images_and_transcripts(){
    // 
    // 1. Display images of the documents when a specific document is selected.
    this.display_images_documents();
    // 
    // 2. Show transcripts
    this.fill_transcriptions();
  }
  //
  // Display images of the documents when a specific document is selected.
  display_images_documents() {
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
  fill_transcriptions() {
    
  }
}
  
//}