// Access the server services by importing all the facilities that are in the
//server module in the schema foler of our library
import * as server from "../../../../../schema/v/code/server.js";
//
// Access to Page class of our library
import * as view from "../../../../../outlook/v/code/view.js";
// 
// Documents category
type category = 'title_deed'|'mutation'|'cert_of_title'|'others';
//
// Get the documents to drive our page.
// A document has the following structure:-
type criteria = 
{
  type: 'keyword',
  word: string
}|
{
  type: 'category',
  name: category
};
// 
// Fields
type fields = "document" | "title_no" | "category" | "area" | "owner" | "regno";
// 
// Images
type images = { 
  url: string;  
};
// 
// Document
type document = {
    name:string,
    images:Array<image>,
    fields:Array<fields>
}
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
  // Here we now intialiaze the components we declared
  constructor() {
    super();
    //
    // the image panel
    this.images_section = document.getElementById("images_section")!;
    //
    // the transcript panel
    this.transcription_section = document.getElementById("transcription_section")!;
    //
    // the folder panel
    this.documents_section = document.getElementById("documents_section")!;
  }
  //
  // Lists all the documents from the database in the document panel
  public async load_documents(criteria?:criteria): Promise<void> {
    //
    const sql = this.get_criteta_sql(criteria);
    // 
    //  Excecute the sql
    const documents: Array<{name:string, images:string, fields:string}> = await server.exec(
      'database',
      ['mutall_mashamba'],
      'get_sql_data',
      [sql]
    );
    // 
    // Append the list of documents to each li element
    documents.forEach(doc=>this.load_document(doc))
  };
  // 
  get_criteta_sql(criteria) {
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
  }
  load_document(document:{name:string, images:string, fields:string}):void{
    // 
    // Create a list element
    const item = this.show_documents_panel(document.name);
    //
    const images:Array<image> = JSON.parse(document.images);
    const fields:Array<field> = JSON.parse(document.fields)
    //
    // 1. Add event listener to the button when its clicked it shows images of the specific document 
    // and its transcription.
    item.onclick = () => {
        images.forEach(Image=>this.display_image(Image));
        fields.forEach(Field=>this.display_field(Field))
  }
  // 
  // Loads documents on document panel
  show_documents_panel(document.name){
    //
    const item= this.document.createElement('li');
    // 
    // Add the value to the li elements
    item.textContent = document.name; 
    //
    // 
    return item;
  }
  //
  // Display images of the documents when a specific document is selected.
  display_image(images:image) {
    //
    // Get the images
    //
    // Get reference to the images panel
    //
    // Append the images to the images panel
  }
  //
  // Fill in the transcriptions when document is selected
  display_field(fields:field) {
    //
    //Skip the pages key (because it is a special key)
    if (key === "pages") return;
    //
    //Get the named element
    const element = <HTMLInputElement>document.getElementById(field);
    //
    //Get the value that maches the key
    const value = this.docs![this.counter][field];
    //
    //Set the element vale only if the value is not null
    if (value !== null) element.value = String(value);
  }
}