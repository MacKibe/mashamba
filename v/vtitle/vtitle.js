// Access the server services by importing all the facilities that are in the
//server module in the schema foler of our library
import * as server from "../../../schema/v/code/server.js";
const x = await server.exec("database", ["mutall_mashamba", false], "get_sql_data", ["/mashamba/v/vtitle/vtitle.sql", "file"]);
//
// Get the first row of the data, in this case its an array of the whole
// data we are using
const y = x[0].vtitle;
//
// Convert the string to an array to be used in displaying the data
const z = JSON.parse(y);
//
// Test supposes to check if we got the data we require
console.log(z);
