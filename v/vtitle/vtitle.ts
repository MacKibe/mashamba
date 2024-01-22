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
type vtitles = { [id: string]: vtitle };
//
//
type vtitle = { [category: string]: Array<doc> };
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
// The details for a transcription.
type transcription = {
  id: string;
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
const value: string = String(row.vtitle);
//
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
    // Let ts be the virtual titles
    const ts: { [key: string]: vtitle } = data;
    //
    // Use a for in loop to visit all the virtual titles.
    for (let key in ts) {
      //
      // Let t be a virtual title
      const t: vtitle = ts[key];
      //
      // Desctructure
      console.log(t);
    }
  }
}

new mashamba().display(vtitles);
