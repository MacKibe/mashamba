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
        // Display the vtitle in the new rows
        data.forEach((vtitle) => {
            //
            // Create a new tr to appen to the tbody
            const new_row = document.createElement("tr");
            //
            // Create td to append the data
            const new_cell = document.createElement("td");
            //
            // Create td to append mutatino data
            const new_mutation_cell = document.createElement("td");
            //
            // Create td to append other data
            const new_others_cell = document.createElement("td");
            //
            // Create td to append titleDeed data
            const new_title_deed_cell = document.createElement("td");
            //
            // Get the mutaions docs
            const mutation_docs = Object.keys(vtitle.docs)
                .filter((category) => category === "mutation")
                .map((category) => vtitle.docs[category]);
            //
            // Get the mutaions docs
            const title_deed_docs = Object.keys(vtitle.docs)
                .filter((category) => category === "title")
                .map((category) => vtitle.docs[category]);
            //
            // Get the mutaions docs
            const other_docs = Object.keys(vtitle.docs)
                .filter((category) => category === "other")
                .map((category) => vtitle.docs[category]);
            //
            // Append data to the cells
            new_cell.textContent = `${vtitle.id}`;
            new_mutation_cell.textContent = `${title_deed_docs.length}`;
            new_others_cell.textContent = `${other_docs.length}`;
            new_title_deed_cell.textContent = `${mutation_docs.length}`;
            //
            // Call coloring funtion to the mutation cell
            this.colorCell(new_mutation_cell);
            //
            // Call coloring funtion to the other cell
            this.colorCell(new_others_cell);
            //
            // Call coloring funtion to the title deed cell
            this.colorCell(new_title_deed_cell);
            //
            // Append the cells to the tr
            new_row.appendChild(new_cell);
            new_row.appendChild(new_title_deed_cell);
            new_row.appendChild(new_mutation_cell);
            new_row.appendChild(new_others_cell);
            //
            // Append the tr to the tbody
            tbody.appendChild(new_row);
            //
            // Check if there are vtitles with both titledeeds and mutations
            if (this.countCells(new_title_deed_cell, 1) +
                this.countCells(new_mutation_cell, 1) +
                this.countCells(new_others_cell, 1) >=
                2) {
                // Add a class name "good" to the row
                new_row.classList.add("good");
            }
            //
            // For testing
            console.log(vtitle.docs);
        });
    }
    //
    // Coloring the data sets
    colorCell(cell) {
        //
        // Get the value of the tds
        // Convert the value to a interger first
        const cell_content = parseInt(cell.textContent || "0", 10);
        //
        // Give class names to the td with different data values
        if (cell_content === 1) {
            cell.classList.add("one");
        }
        else if (cell_content < 1) {
            cell.classList.add("zero");
        }
        else {
            cell.classList.add("plus_one");
        }
    }
    countCells(cell, targetValue) {
        const cellContent = parseInt(cell.textContent || "0", 10);
        return cellContent === targetValue ? 1 : 0;
    }
}
new mashamba().display(vtitles);
