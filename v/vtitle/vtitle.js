// Access the server services by importing all the facilities that are in the
//server module in the schema foler of our library
import * as server from "../../../schema/v/code/server.js";
//
//
import { view } from "../../../outlook/v/code/view.js";
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
    // Display the vtitle ids in a table.
    display(data) {
        // Get the table body element
        const tbody = this.get_element("vtitles");
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
new mashamba().display(vtitles);
