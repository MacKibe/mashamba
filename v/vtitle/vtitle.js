// Access the server services by importing all the facilities that are in the
//server module in the schema foler of our library
import * as server from "../../../schema/v/code/server.js";
//
//
import { view } from "../../../outlook/v/code/view.js";
//
//
const rows = await server.exec("database", ["mutall_mashamba", false], "get_sql_data", ["/mashamba/v/vtitle/vtitles.sql", "file"]);
// Get the only row of the data
const row = rows[0];
//
// Get the vtitle property of the row
const value = String(row.vtitle);
//
// Convert the string to an array
const vtitles = JSON.parse(value);
class mashamba extends view {
    constructor() {
        super();
    }
    //
    // Display the vtitles in a table.
    display(data) {
        //
        // Let ts be the virtual titles
        const ts = data;
        //
        // Use a for in loop to visit all the virtual titles.
        for (let key in ts) {
            //
            // Let t be a virtual title
            const t = ts[key];
            //
            // Desctructure
            console.log(t);
        }
    }
}
new mashamba().display(vtitles);
