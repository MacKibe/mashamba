// Access the server services by importing all the facilities that are in the
//server module in the schema foler of our library
import * as server from "../../../schema/v/code/server.js";
//
//
import { basic_value, fuel } from "../../../schema/v/code/schema.js";
//
// Access to Page class of our library
import * as view from "../../../outlook/v/code/view.js";
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
export class mashamba {
  
const x: Array<fuel> = await server.exec(
  "database",
  ["mutall_mashamba", false],
  "get_sql_data",
  ["/mashamba/v/vtitle/vtitle.sql", "file"]
);
//
// Get the first row of the data, in this case its an array of the entire
// data we will use
const y: string = x[0].vtitle;
//
// Convert the string to an array
const z: vtitle = JSON.parse(y);
//
// Test supposes, to check if we got the data we require
console.log(z);
}