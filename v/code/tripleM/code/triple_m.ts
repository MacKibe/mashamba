// Access the server services by importing all the facilities that are in the
//server module in the schema foler of our library
import * as server from "../../../../../schema/v/code/server.js";
//
//Access the library needed for saving data to a database from Javascript
import * as quest from "../../../../../schema/v/code/questionnaire.js";
//
// Access to Page class of our library
import * as view from "../../../../../outlook/v/code/view.js";
//
// Get the documents to drive our page. A document has the following structure:-
type doc = {
  document: string;
  pages: string;
  title_no: string;
  category: string;
  area: number;
  owner: string;
  regno: string;
};
//
// A page comprises of just a number and the url of the image
type page = {
  num: string;
  url: string;
  name: string;
};
//
// THese keys are used in saving of data in the database.
type keys = "document" | "title_no" | "category" | "area" | "owner" | "regno";
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
  //The couner for documents being displayed
  public counter: number = 0;
  //
  // The results of interrogating the database is an array of documents
  public docs?: Array<doc>;

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
  // Loads all the folders in the database for categorization of the documents
  // Lists all the documents from the database assuming one of the radio buttons will be selected.
  public async load_documents(): Promise<void> {
    //
    // Execute sql to list the documents.
    this.docs = await server.exec(
      "database",
      ["mutall_mashamba", false],
      "get_sql_data",
      ["/mashamba/v/code/tripleM/v/data/mashamba.sql", "file"]
    );
    //
    // Display all the documents in the documents panel.
    this.list_documents();
  }
  //
  // Listing the documents on the documents panel.
  list_documents() {
    //
    // 1.
    //
    // Displays the images and the transcription when document is selected.
  }
  //
  // Displays the images and the transcription when document is selected.
  selected_document() {}
  //
  // Gets all the images of the documents when a specific document is selected.
  display_images_documents() {}
  //
  // Fill in the transcriptions when document is selected
  fill_transcriptions() {}
}
