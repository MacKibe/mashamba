// Access the server services by importing all the facilities that are in the
//server module in the schema foler of our library
import * as server from "../../../schema/v/code/server.js";
//
// Access to Page class of our library
import * as view from "../../../outlook/v/code/view.js";
//
// Get the documents to drive our page.
// A document has the following structure:-
type criterias = 
{
  type: 'keyword',
  word: string
}|
{
  type: 'category',
  name: categories
};
// 
// didnt include the pk
type categories = {
  name:string;
  no_of_documents:number;
}
// 
// 
type transcriptions = "id"|"area"|"regno"|"person";
// 
//
type images = {
  num:number;
  url:string;
}
// 
//
type documents = {
    pk:number;
    name:string;
    image:Array<images>;
    transcription:transcriptions;
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
  public async load_documents(criteria?:criterias): Promise<void> {
    //
    const sql = this.get_criteria_sql(criteria);
    // 
    //  Excecute the sql
    const x: Array<string> = await server.exec(
      'database',
      ['mutall_mashamba'],
      'get_sql_data',
      [sql]
    );
    const y:documents = JSON.parse(x[0])
    //
    // 
  };
  //  
  // 
  get_criteria_sql(criteria:criterias):string {
    //
    //Start with an empty sql
    let sql:string;
    //
    //Get the ctes from '/mashamba/v/triple_m/triple_m.sql'
    //
    //Complete the ctes with the clause for retrieving office,
    //select * from office
    //
    //Replace @category with the criteria
    //
    //Return the complete sqls
    
  }
  //  
  //
  load_document(document:documents):void{
    //
    // Create a list element
    const items:string = this.show_documents_panel(document);
    //
    // 
    const image:Array<images> = JSON.parse(documents);
    // 
    // 
    const transcription:Array<transcriptions> = JSON.parse(document.transcription);
    //
    // 1. Add event listener to the button when its clicked it shows images of the specific document 
    // and its transcription.
    items.onclick = () => {
        image.forEach(Image=>this.display_image(Image));
        transcription.forEach(transcription=>this.display_field(transcription))
    }
  }
    // 
  // Loads documents on document panel
  show_documents_panel(document:documents){
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
  }
  //
  // Fill in the transcriptions when document is selected
  display_field(transciptions:transcription) {
  }
}