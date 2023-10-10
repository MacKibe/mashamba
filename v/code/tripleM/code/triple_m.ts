// Access the server services by importing all the facilities that are in the
//server module in the schema foler of our library
import * as server from "../../../schema/v/code/server.js";
//
//Access the library needed for saving data to a database from Javascript
import * as quest from "../../../schema/v/code/questionnaire.js";
//
// Access to Page class of our library
import * as view from "../../../outlook/v/code/view.js";
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
  public folder_section: HTMLElement;
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
    //
    this.images_section = document.getElementById("images_section")!;
    // the transcript panel
    //
    this.transcription_section = document.getElementById(
      "transcription_section"
    )!;
    //
    // the folder panel
    this.folder_section = document.getElementById("folder_section")!;
    //
    //
  }
  //
  // Show the panels i.e image, transcription and the folders panel.
  public async show_panels(): Promise<void> {
    //
    // Load the documents from the database.
    this.docs = await server.exec(
      "database",
      ["mutall_mashamba", false],
      "get_sql_data",
      ["/mashamba/v/code/mashamba.sql", "file"]
    );
    //
    // Load all the data from the database
    this.load_data();
  }
  load_data(){
    // 
    // Load the folders on the folders panel
    this.load_folders();
    // 
    // Load all the first page documents
    this.load_first_pages_of_documents();
    // 
    // Fill in the transcriptions when document is hightlighted/selected
    this.fill_transcriptions();
  }
  // 
  // Loads all the folders in the database for categorization of the documents
  // Lists all the folders and when on is selected displays and the documents in the folder from the database.
  load_folders(){

  }
  // 
  // Gets all the first pages of the documents and displays on the images panel.
  load_first_pages_of_documents(){
    
  }
  // 
  // Fill in the transcriptions when document is hightlighted/selected
  fill_transcriptions(){
    // 
    // Checks if a document is hightlighted, if highlighted displays its transcriptions. 
  }
}
