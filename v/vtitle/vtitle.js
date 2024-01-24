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
const value = String(row.vtitles);
//a
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
        // Get the table body to display the data
        const tbody = this.get_element("table_body");
        //
        // Get the table head
        const thead = this.get_element("table_head");
        //
        // Get the number of elements in the table head to populate the td for the new rows.
        const number_of_tds = thead.getElementsByTagName("th").length;
        //
        // Create a new tr to appen to the tbody
        const new_row = document.createElement("tr");
        //
        // Create td to append the data
        const new_cell = document.createElement("td");
        //
        //
        console.log(number_of_tds);
        //
        // Loop through each vtitle and append id to the td.
        // data.forEach((vtitle) => {
        //   console.log(vtitle);
        // });
    }
}
new mashamba().display(vtitles);
