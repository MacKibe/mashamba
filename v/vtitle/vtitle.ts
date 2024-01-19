// Access the server services by importing all the facilities that are in the
//server module in the schema foler of our library
import * as server from "../../../schema/v/code/server.js";
//
//
import { fuel } from "../../../schema/v/code/schema.js";
//
//
import { view } from "../../../outlook/v/code/view.js";
////
//// numeric value for prirmary keys
type pk = number;
////
//// Will contain all the data for our system.
// type vtitles = Array<vtitle>;
////
//// Conatins the title details for our table section
//type vtitle2 = {
//  id: string;
//  stitle: docs;
//  mutation: docs;
//  others: docs;
//};
type vtitle = {
  id: string;
  docs: { [category: string]: docs };
};
//
type docs = {
  count: number;
  list: Array<doc>;
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
//
// The details for a document.a
type transcription = {
  id: string;
  category: string;
  folder: string;
  regno: number;
  area: number;
  person: string;
};

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
const value: string = String(row.vtitle);
//
// Convert the string to an array
const vtitles: vtitle = JSON.parse(value);

class mashamba extends view {
  constructor() {
    super();
  }
  //
  // Display the vtitle ids in a table.
  display(data: vtitle): void {
    // Get the table body element
    const tbody: HTMLElement = this.get_element("vtitles");

    // Iterate through vtitles and populate the table with vtitle IDs
    Object.keys(data).forEach((vtitle) => {
      // Create a new row
      const row = document.createElement("tr");

      // Add row to tbody element
      const addRow = tbody.appendChild(row);

      // Add a cell to the row for the vtitle ID
      const idCell = addRow.insertCell(0);

      // Populate the cell with the vtitle ID
      idCell.textContent = vtitle.id;
    });
  }
}

// Assuming you have a table with id="vtitles" in your HTML.
new mashamba().display(vtitles.vtitle);
