// Access the server services by importing all the facilities that are in the
//server module in the schema foler of our library
import * as server from "../../../schema/v/code/server.js";
//
//
import { fuel } from "../../../schema/v/code/schema.js";
//
//
import { view } from "../../../outlook/v/code/view.js";
//
// numeric value for prirmary keys
type pk = number;
//
// Will contain all the data for our system.
type vtitles = Array<vtitle>;
//
//
type vtitle = {
  id: string;
  docs: { [category: string]: docs };
};

type docs = {
  id: string;
  category: string;
  docs: Array<doc>;
};
//
// Contains the documents pages and transcriptions
type doc = {
  document: pk;
  pages: Array<page>;
  transcriptions: transcription;
};
//
// The pages of a document
type page = {
  page: pk;
  url: string;
  num: number;
};

type pages = Array<page>;

//
// The details for a transcription.
type transcription = {
  title_id: string;
  category: string;
  folder: string;
  regno: number;
  area: number;
  person: string;
};
//
//
const rows: Array<fuel> = await server.exec(
  "database",
  ["mutall_mashamba", false],
  "get_sql_data",
  ["/mashamba/v/vtitle/vtitles.sql", "file"]
);
// Get the only row of the data
const row: fuel = rows[0];
//
// Get the vtitle property of the row
const value: string = String(row.vtitles);
//a
// Convert the string to an array
const vtitles: vtitles = JSON.parse(value);

class mashamba extends view {
  constructor() {
    super();
  }
  //
  // Display the vtitles in a table.
  public display(data: vtitles): void {
    //
    // Get the table body to display the data
    const tbody: HTMLElement = this.get_element("table_body");
    //
    // Get the table head
    const thead: HTMLElement = this.get_element("table_head");
    //
    // Get the number of elements in the table head to populate the td for the new rows.
    const number_of_tds = thead.getElementsByTagName("th").length;
    //
    // Create a new tr to appen to the tbody
    const new_row: HTMLElement = document.createElement("tr");
    //
    // Create td to append the data
    const new_cell: HTMLElement = document.createElement("td");
    // 
    // Append data to the cells
    // Destructure the vtitles 
    const {id,docs} = data
    // 
    // Append the cells to the tr
    //
    // Append the tr to the tbody
    tbody.appendChild(new_row);
    // 
    //  
    
  }
}

new mashamba().display(vtitles);
